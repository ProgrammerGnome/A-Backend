package com.example.innoteq.controller;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.model.PersonModel;
import com.example.innoteq.model.SaleModel;
import com.example.innoteq.model.forServerOnly.PersonItemModel;
import com.example.innoteq.repository.ItemRepository;
import com.example.innoteq.repository.PersonRepository;
import com.example.innoteq.repository.SaleRepository;
import com.example.innoteq.service.ItemService;
import com.example.innoteq.service.PersonService;
import com.example.innoteq.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Controller
public class FetchController {

    /*
    Lehet @Autowired annotációt vagy helyette "private final"-t használni, itt most az annotációkat fogom.
    */

    @Autowired
    private PersonService personService;
    @Autowired
    private ItemService itemService;
    @Autowired
    private SaleService saleService;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private SaleRepository saleRepository;

    public FetchController(PersonService personService, ItemService itemService, SaleService saleService) {
        super();
        this.personService = personService;
        this.itemService = itemService;
        this.saleService = saleService;
    }

    //POST végpont az új értékesítések fogadásához és adatbázisba mentéséhez.
    @CrossOrigin(origins = "http://localhost:5173")
    @Transactional
    @PostMapping("/save-new-sale")
    public ResponseEntity<String> saveNewSale(@RequestBody PersonItemModel personItemModel) {
        PersonModel personModel = personItemModel.getPersonModel();
        List<ItemModel> itemModels = personItemModel.getItemModels();

        PersonModel personId = personService.createPerson(personModel);
        List<ItemModel> itemIds = itemService.createItems(itemModels);

        for (ItemModel item : itemIds) {
            SaleModel saleModel = new SaleModel();
            saleModel.setPersonModel(personId);
            saleModel.setItemModel(item);
            saleModel.setDatetime(new Date());

            saleService.createSale(saleModel);

            String productName = item.getProductName();
            Long itemId = item.getItemId();
            itemRepository.updateItemPriceByProductInfo(productName, itemId);
        }

        return ResponseEntity.ok("Sikeres mentés.");
    }

    //GET végpont, mely kilistázza az eddigi aktív értékesítéseket.
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/items-with-person-and-sale-data")
    public ResponseEntity<Map<String, List<Object[]>>> getItemsWithPersonAndSaleData() {
        List<Object[]> items = itemRepository.getItemsWithPersonAndSaleData();

        Map<String, List<Object[]>> response = new HashMap<>();
        response.put("items", items);

        return ResponseEntity.ok(response);
    }

    /*
    Dolgozói fogyasztásriport
    Ebben a metódusban kezelnem kellett hogy az "aktív" és a lezárt értékesítéses lekérdezésekből érkező
    személynevek és hozzájuk tartozó összegek csak egyszer, szummázva szerepeljenek a felsorolásban.
    */
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/2feladat")
    public ResponseEntity<Map<String, List<Object[]>>> getPersonSalesByCurrentMonth() {
        List<Object[]> persons = personRepository.getPersonSalesByCurrentMonth();
        persons.addAll(personRepository.getPersonSalesByCurrentMonthClosed());

        Map<String, List<Object[]>> response = new HashMap<>();
        List<Object[]> distinctPersons = new ArrayList<>();

        //Először kinyerem a személyneveket és a vásárlás végösszegét
        for (Object[] person : persons) {
            String personName = (String) person[0];
            Long totalSales = (Long) person[1];

            //Majd megvizsgálom, hogy az adott személy szerepelt-e már a listában:
            boolean found = false;
            for (Object[] distinctPerson : distinctPersons) {
                String distinctPersonName = (String) distinctPerson[0];
                Long distinctTotalSales = (Long) distinctPerson[1];
                if (personName.equals(distinctPersonName)) {    // - Ha igen: összeadjuk a nála szereplő összegeket
                    distinctPerson[1] = totalSales + distinctTotalSales;
                    found = true;
                    break;
                }
            }
            if (!found) {
                distinctPersons.add(person); // - Ha nem: hozzáadjuk a listához
            }
        }

        response.put("persons", distinctPersons);
        return ResponseEntity.ok(response);
    }

    /*
    Termékek fogyásának riportja (rendezve a fogyás mennyiségére fordítottan: azaz amiből a legtöbb fogyott az kerül legfelülre)
    Ez a metódus kicsit hosszúra sikerült, mivel két külön DB lekérdezés List<Object[]> -ben tárolt adatait kellett összefésülnöm.
    */
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/3feladat")
    public ResponseEntity<Map<String, List<Object[]>>> fetchProcuctQuantityByCurrentMonth() {
        List<Object[]> sales = saleRepository.getProductSalesByMonth();
        sales.addAll(saleRepository.getProductSalesByMonthClosed());

        Map<String, Long> salesMap = new HashMap<>();
        for (Object[] sale : sales) {
            String productName = (String) sale[0];
            Long quantity = (Long) sale[2];
            salesMap.put(productName, salesMap.getOrDefault(productName, 0L) + quantity);
        }

        /*
        Megoldom, hogy az aktív és lezárt táblából származó értékesítéshez tartozó terméknevek
        csak egyszer szerepeljenek a felsorolásban.
        */
        List<Object[]> consolidatedSales = new ArrayList<>();
        for (Map.Entry<String, Long> entry : salesMap.entrySet()) {
            Object[] consolidatedSale = new Object[3];
            consolidatedSale[0] = entry.getKey();
            consolidatedSale[1] = null;
            consolidatedSale[2] = entry.getValue();
            consolidatedSales.add(consolidatedSale);
        }

        /*
        Ez egy Lambdafüggvény:
        "Egyberendezi" az aktív és lezárt értékesítésekhez tartozó termékek fogyásának értékeit.
        Mivel két külön DB lekérdezés volt, ezért erre itt most szükség van.
        */
        consolidatedSales.sort((a, b) -> {
            Long quantityA = (Long) a[2];
            Long quantityB = (Long) b[2];
            Integer quantityAInt = quantityA.intValue();
            Integer quantityBInt = quantityB.intValue();
            return quantityBInt.compareTo(quantityAInt);
        });

        Map<String, List<Object[]>> response = new HashMap<>();
        response.put("sales", consolidatedSales);

        return ResponseEntity.ok(response);
    }

    //GET végpont amely a lezárt értékesítéseket tartalmazó tábla adatait adja át a frontendnek.
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/closed-sale-table")
    public ResponseEntity<Map<String, List<Object[]>>> getClosedSaleTable() {
        List<Object[]> items = itemRepository.getClosedSaleTable();

        Map<String, List<Object[]>> response = new HashMap<>();
        response.put("items", items);

        return ResponseEntity.ok(response);
    }

}
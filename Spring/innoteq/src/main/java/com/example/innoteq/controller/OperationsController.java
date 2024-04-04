package com.example.innoteq.controller;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.model.PersonModel;
import com.example.innoteq.model.SaleModel;
import com.example.innoteq.repository.ItemRepository;
import com.example.innoteq.repository.PersonRepository;
import com.example.innoteq.repository.ProductInfoRepository;
import com.example.innoteq.repository.SaleRepository;
import com.example.innoteq.repository.junctionRepository.ItemProductRepository;
import com.example.innoteq.service.ItemService;
import com.example.innoteq.service.PersonService;
import com.example.innoteq.service.SaleService;
import com.example.innoteq.service.junctionService.ItemProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api")
public class OperationsController {

    /*
    Lehet @Autowired annotációt vagy helyette "private final"-t használni, itt most a "private final" megoldást fogom.
    Az itt található metódusok Mappingjei magukért beszélnek. A CRUD-ból az UPDATE, DELETE, CLOSE post hívások itt valósulnak meg.
    */

    private final ItemService itemService;
    private final ProductInfoRepository productInfoRepository;
    private final ItemRepository itemRepository;
    private final PersonRepository personRepository;
    private final SaleRepository saleRepository;

    private final PersonService personService;
    private final SaleService saleService;
    private final ItemProductService itemProductService;
    private final ItemProductRepository itemProductRepository;


    @Autowired
    public OperationsController(ItemService itemService, ProductInfoRepository productInfoRepository, ItemRepository itemRepository, PersonRepository personRepository, SaleRepository saleRepository, PersonService personService, SaleService saleService, ItemProductService itemProductService, ItemProductRepository itemProductRepository) {
        this.itemService = itemService;
        this.productInfoRepository = productInfoRepository;
        this.itemRepository = itemRepository;
        this.personRepository = personRepository;
        this.saleRepository = saleRepository;
        this.personService = personService;
        this.saleService = saleService;
        this.itemProductService = itemProductService;
        this.itemProductRepository = itemProductRepository;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @Transactional
    @PostMapping("/update-item")
    public ResponseEntity<String> updateItem(@RequestBody ItemModel item) {

        PersonModel person = new PersonModel();
        SaleModel sale = new SaleModel();

        person.setPersonId(item.getPersonId());
        person.setPersonName(item.getPersonName());

        sale.setSaleId(item.getSaleId());
        sale.setDatetime(item.getDatetime());
        sale.setPersonModel(person);
        sale.setItemModel(item);

        itemRepository.save(item);
        personRepository.save(person);
        saleRepository.save(sale);

        if (item != null) {
            return new ResponseEntity<>("Item updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to update item", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @Transactional
    @PostMapping("/delete-item")
    public ResponseEntity<String> deleteItem(@RequestBody ItemModel item) {

        Long itemId = item.getItemId();
        item.setItemId(itemId);
        Long personId = item.getPersonId();
        item.setPersonId(personId);
        Long saleId = item.getSaleId();
        item.setSaleId(saleId);

        itemProductRepository.deleteByItemId(item);
        itemService.deleteItemById(item);

        if (itemId != null) {
            return new ResponseEntity<>("Item updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to update item", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @Transactional
    @PostMapping("/close-item")
    public ResponseEntity<String> closeItem(@RequestBody ItemModel item) {

        String personName = item.getPersonName();
        String productName = item.getProductName();
        Integer quantity = item.getQuantity();
        Integer price = item.getPrice();
        Date datetime = item.getDatetime();
        Date closedDate = new Date();
        Long personId = item.getPersonId();

        saleRepository.insertIntoClosedTable(personName, productName, quantity, price, datetime, closedDate, personId);

        Long itemId = item.getItemId();

        itemProductRepository.deleteByItemId(item);
        itemService.deleteItemById(item);

        if (itemId != null) {
            return new ResponseEntity<>("Item updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to update item", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

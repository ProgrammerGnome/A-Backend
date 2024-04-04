package com.example.innoteq.repository;

import com.example.innoteq.model.ItemModel;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends CrudRepository<ItemModel, Long> {

    /*
    Adatok módosításánál (új adatok beszúrása) fontos, hogy NE natív SQL lekérdezéseket használjunk,
    mivel azok alkalmat adhatnak egy esetleges SQL injection támadásra.
    */
    @Modifying
    @Query("UPDATE ItemModel i SET i.price = (SELECT p.price * i.quantity FROM ProductInfoModel p WHERE p.productName = ?1) WHERE i.itemId = ?2")
    void updateItemPriceByProductInfo(String productName, Long itemId);

    /*
    Ezek a lekérdezések, mivel nem módosítják az adatbázis tartalmát nyugodtan lehetnek natív SQL lekérdezések is.
    */
    @Query(nativeQuery = true,
            value = "SELECT i.item_id, p.person_id, s.sale_id," +
                    "p.person_name, s.datetime, i.product_name, i.quantity, i.price " +
                    "FROM item i " +
                    "JOIN sale s ON i.item_id = s.item_id " +
                    "JOIN person p ON s.person_id = p.person_id " +
                    "ORDER BY s.datetime DESC")
    List<Object[]> getItemsWithPersonAndSaleData();

    /*
    Itt lehetett volna "SELECT * FROM..."-ot is használni, viszont nem jöttem rá, hogy a Hibernate milyen sorrendben
    generálja az oszlopokat. Így ezzel a megadási móddal biztos, hogy jó oszlopban jelennek meg a frontenden az étékek.
    Manuális DB létrehozáskor átírható "SELECT * FROM..."-ra is ez a kód. :)
    */
    @Query(nativeQuery = true, value = "SELECT sale_id, person_name, product_name, quantity, price, datetime, closed_date FROM closed ORDER BY closed.closed_date DESC")
    List<Object[]> getClosedSaleTable();

}
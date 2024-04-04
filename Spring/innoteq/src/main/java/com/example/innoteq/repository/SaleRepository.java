package com.example.innoteq.repository;

import com.example.innoteq.model.SaleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
@Repository
public interface SaleRepository extends JpaRepository<SaleModel, Long> {

    /*
    Ezek a lekérdezések, mivel nem módosítják az adatbázis tartalmát nyugodtan lehetnek natív SQL lekérdezések is.
    */
    @Query(value = "SELECT i.product_name, EXTRACT(MONTH FROM s.datetime) AS month, SUM(i.quantity) AS total_quantity " +
            "FROM sale s " +
            "JOIN item i ON s.item_id = i.item_id " +
            "WHERE EXTRACT(MONTH FROM s.datetime) = EXTRACT(MONTH FROM CURRENT_DATE) " +
            "GROUP BY i.product_name, EXTRACT(MONTH FROM s.datetime) " +
            "ORDER BY total_quantity DESC", nativeQuery = true)
    List<Object[]> getProductSalesByMonth();
    @Query(value = "SELECT c.product_name, EXTRACT(MONTH FROM c.datetime) AS month, SUM(c.quantity) AS total_quantity " +
            "FROM closed c " +
            "WHERE EXTRACT(MONTH FROM c.datetime) = EXTRACT(MONTH FROM CURRENT_DATE) " +
            "GROUP BY c.product_name, EXTRACT(MONTH FROM c.datetime) " +
            "ORDER BY total_quantity DESC", nativeQuery = true)
    List<Object[]> getProductSalesByMonthClosed();

    /*
    Adatok módosításánál alapvetően NEM használhatunk natív SQL lekérdezéseket az esetleges SQL injection miatt.
    DE! Itt azonban olyan adatokat mentünk a "closed" tálába, melyeket már egyszer validáltunk.
    Tehát itt kivételesen használhatunk natív SQL-t is...
    */
    @Modifying
    @Query(value = "INSERT INTO closed (person_name, product_name, quantity, price, datetime, closed_date, person_id) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)", nativeQuery = true)
    void insertIntoClosedTable(String personName, String productName, Integer quantity, Integer price, Date datetime, Date closedDate, Long personId);

}

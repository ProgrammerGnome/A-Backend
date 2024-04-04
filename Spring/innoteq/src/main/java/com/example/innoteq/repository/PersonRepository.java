package com.example.innoteq.repository;

import com.example.innoteq.model.PersonModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<PersonModel, Long> {

    /*
    Ezek a lekérdezések, mivel nem módosítják az adatbázis tartalmát nyugodtan lehetnek natív SQL lekérdezések is.
    */
    @Query(value = "SELECT p.person_name, SUM(i.price) AS total_price " +
            "FROM person p " +
            "JOIN sale s ON p.person_id = s.person_id " +
            "JOIN item i ON s.item_id = i.item_id " +
            "WHERE EXTRACT(MONTH FROM s.datetime) = EXTRACT(MONTH FROM CURRENT_DATE) " +
            "GROUP BY p.person_name, EXTRACT(MONTH FROM s.datetime)", nativeQuery = true)
    List<Object[]> getPersonSalesByCurrentMonth();

    @Query(value = "SELECT c.person_name, SUM(c.price) AS total_price " +
            "FROM closed c " +
            "WHERE EXTRACT(MONTH FROM c.datetime) = EXTRACT(MONTH FROM CURRENT_DATE) " +
            "GROUP BY c.person_name, EXTRACT(MONTH FROM c.datetime), c.person_name", nativeQuery = true)
    List <Object[]> getPersonSalesByCurrentMonthClosed();

}

package com.example.innoteq.repository.junctionRepository;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.model.junctionModel.ItemProductId;
import com.example.innoteq.model.junctionModel.ItemProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ItemProductRepository extends JpaRepository<ItemProductModel, ItemProductId> {

    /*
    Adatok módosításánál (jelenleg törlés) fontos, hogy NE natív SQL lekérdezéseket használjunk,
    mivel azok alkalmat adhatnak egy esetleges SQL injection támadásra.
    (Bár ennek itt pont nincs jelentőssége, mivel az ID-t úgysem a felhasználó adja meg.)
    */
    @Transactional
    @Modifying
    @Query("DELETE FROM ItemProductModel WHERE id.item = :item")
    void deleteByItemId(@Param("item") ItemModel item);

}

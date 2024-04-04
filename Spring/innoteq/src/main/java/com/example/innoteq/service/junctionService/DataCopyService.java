package com.example.innoteq.service.junctionService;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.model.ProductInfoModel;
import com.example.innoteq.model.junctionModel.ItemProductModel;
import com.example.innoteq.repository.ItemRepository;
import com.example.innoteq.repository.ProductInfoRepository;
import com.example.innoteq.repository.junctionRepository.ItemProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataCopyService {

    /*
    Itt van megírva az a szolgáltatás, amelyet bárhonnan meghívva feltölthetjük a kapcsolótáblákat.
    Bővebb információ az "InnoTeqApplication" vezérlőosztályban található.
    */

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ProductInfoRepository productInfoRepository;

    @Autowired
    private ItemProductRepository itemProductRepository;

    public void copyDataToItemProductTable() {

        // Lekérjük az "item" tábla adatait
        List<ItemModel> items = (List<ItemModel>) itemRepository.findAll();

        try{
            for (ItemModel item : items) {

                // Lekérjük a "product_info" tábla adatait a "product_id" azonosító alapján
                ProductInfoModel productInfo = productInfoRepository.findByProductName(item.getProductName());

                // Létrehozzuk az új rekordot a kapcsolótáblában
                ItemProductModel itemProduct = new ItemProductModel();

                itemProduct.setItem(item);
                itemProduct.setProductInfo(productInfo);
                itemProductRepository.save(itemProduct);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}



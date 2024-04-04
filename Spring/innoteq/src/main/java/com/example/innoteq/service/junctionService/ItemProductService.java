package com.example.innoteq.service.junctionService;

import com.example.innoteq.model.junctionModel.ItemProductModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemProductService {

    List<ItemProductModel> getAllItemProduct();

    ItemProductModel createItemProduct(ItemProductModel itemProductModel);

    ItemProductModel updateItemProduct(ItemProductModel itemProductModel);

}
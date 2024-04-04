package com.example.innoteq.service;

import com.example.innoteq.model.ItemModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemService {

    void deleteItemById(ItemModel item);

    List<ItemModel> createItems(List<ItemModel> itemModels);

}

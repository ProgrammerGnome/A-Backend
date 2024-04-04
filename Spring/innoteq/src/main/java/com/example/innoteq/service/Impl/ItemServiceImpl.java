package com.example.innoteq.service.Impl;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.repository.ItemRepository;
import com.example.innoteq.service.ItemService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    private ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        super();
        this.itemRepository = itemRepository;
    }


    @Override
    public void deleteItemById(ItemModel item) {
        itemRepository.deleteById(item.getItemId());
    }

    @Override
    public List<ItemModel> createItems(List<ItemModel> itemModels) {
        List<ItemModel> savedItems = new ArrayList<>();
        for (ItemModel itemModel : itemModels) {
            ItemModel savedItem = itemRepository.save(itemModel);
            savedItems.add(savedItem);
        }
        return savedItems;
    }

}

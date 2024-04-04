package com.example.innoteq.service.junctionService.Impl;

import com.example.innoteq.model.junctionModel.ItemProductModel;
import com.example.innoteq.repository.junctionRepository.ItemProductRepository;
import com.example.innoteq.service.junctionService.ItemProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemProductServiceImpl implements ItemProductService {
    private ItemProductRepository itemProductRepository;

    public ItemProductServiceImpl(ItemProductRepository itemProductRepository) {
        super();
        this.itemProductRepository = itemProductRepository;
    }

    @Override
    public List<ItemProductModel> getAllItemProduct() {
        return itemProductRepository.findAll();
    }

    @Override
    public ItemProductModel createItemProduct(ItemProductModel itemProductModel) {
        return itemProductRepository.save(itemProductModel);
    }

    @Override
    public ItemProductModel updateItemProduct(ItemProductModel itemProductModel) {
        return itemProductRepository.save(itemProductModel);
    }
}
package com.example.innoteq.service;

import com.example.innoteq.model.ProductInfoModel;
import com.example.innoteq.repository.ProductInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductInfoService {
    private ProductInfoRepository productInfoRepository;

    @Autowired
    public ProductInfoService(ProductInfoRepository productInfoRepository) {
        this.productInfoRepository = productInfoRepository;
    }

    public ProductInfoModel getProductInfoByName(String productName) {
        return productInfoRepository.findByProductName(productName);
    }

}

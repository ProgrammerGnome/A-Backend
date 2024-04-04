package com.example.innoteq.controller;

import com.example.innoteq.model.ProductInfoModel;
import com.example.innoteq.repository.ProductInfoRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/productInfo")
public class ProductInfoController {

    private final ProductInfoRepository productInfoRepository;

    public ProductInfoController(ProductInfoRepository productInfoRepository) {
        this.productInfoRepository = productInfoRepository;
    }

    //Frontendnek szolgáltatjuk a termékek neveinek és egységárainak listáját.
    @GetMapping
    public List<ProductInfoModel> getProductInfoList() {
        return productInfoRepository.findAll();
    }
}

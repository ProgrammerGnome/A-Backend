package com.example.innoteq.repository;

import com.example.innoteq.model.ProductInfoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductInfoRepository extends JpaRepository<ProductInfoModel, String> {
    ProductInfoModel findByProductName(String productName);
}
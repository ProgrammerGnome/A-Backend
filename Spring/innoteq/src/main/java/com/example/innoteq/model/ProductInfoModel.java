package com.example.innoteq.model;

import com.example.innoteq.model.junctionModel.ItemProductModel;
import com.example.innoteq.pojo.ProductInfoPojo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Entity
@Table(name = "product_info")
@Data
@AllArgsConstructor
public class ProductInfoModel {
    @Id
    @Column(name = "product_name")
    private String productName;

    @Column(name = "unit_price")
    private Integer price;

    @OneToMany(mappedBy = "productInfo", fetch = FetchType.EAGER)
    private List<ItemProductModel> itemProducts;

    public ProductInfoModel() {
        // constructor for controller class
    }

    public ProductInfoModel(ProductInfoPojo productInfoPojo) {
        this.productName = productInfoPojo.getProductName();
        this.price = productInfoPojo.getPrice();
    }

    public void setProductId(String productName) {
        this.productName = productName;
    }
    public void setProductName(Integer unitPrice) {
        this.price = unitPrice;
    }
}
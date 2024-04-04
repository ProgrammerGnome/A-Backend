package com.example.innoteq.pojo;

import com.example.innoteq.model.ProductInfoModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductInfoPojo {

    private String productName;
    private Integer price;

    public ProductInfoPojo(ProductInfoModel productInfoModel){
        this.productName = productInfoModel.getProductName();
        this.price = productInfoModel.getPrice();
    }
}
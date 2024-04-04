package com.example.innoteq.pojo.junctionPojo;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.model.ProductInfoModel;
import com.example.innoteq.model.junctionModel.ItemProductModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemProductPojo {

    private ItemModel item;
    private ProductInfoModel productInfo;

    public ItemProductPojo(ItemProductModel itemProductModel){
        this.item = itemProductModel.getItem();
        this.productInfo = itemProductModel.getProductInfo();
    }
}
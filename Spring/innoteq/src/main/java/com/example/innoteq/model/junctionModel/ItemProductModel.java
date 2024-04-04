package com.example.innoteq.model.junctionModel;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.model.ProductInfoModel;
import com.example.innoteq.pojo.junctionPojo.ItemProductPojo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Entity
@Table(name = "item_product")
@Data
@AllArgsConstructor
@IdClass(ItemProductId.class)
public class ItemProductModel {
    @Id
    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    @MapsId("itemId")
    private ItemModel item;

    @Id
    @ManyToOne
    @JoinColumn(name = "product_name", referencedColumnName = "product_name")
    @MapsId("productName")
    private ProductInfoModel productInfo;

    public ItemProductModel() {
        // constructor for controller class
    }

    public ItemProductModel(ItemProductPojo itemProductPojo) {
        this.item = itemProductPojo.getItem();
        this.productInfo = itemProductPojo.getProductInfo();
    }

    public void setItemModel(ItemModel item) {
        this.item = item;
    }
    public void setProductInfoModel(ProductInfoModel productInfo) {
        this.productInfo = productInfo;
    }

}
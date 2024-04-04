package com.example.innoteq.pojo;

import com.example.innoteq.model.ItemModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPojo {

    private Long itemId;
    private String productName;
    private Integer price;
    private Integer quantity;

    public ItemPojo(ItemModel itemModel){
        this.itemId = itemModel.getItemId();
        this.productName = itemModel.getProductName();
        this.price = itemModel.getPrice();
        this.quantity = itemModel.getQuantity();
    }
}

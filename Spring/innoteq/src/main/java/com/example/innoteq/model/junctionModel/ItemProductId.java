package com.example.innoteq.model.junctionModel;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.model.ProductInfoModel;

import java.io.Serializable;
import java.util.Objects;

public class ItemProductId implements Serializable {
    private ItemModel item;
    private ProductInfoModel productInfo;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemProductId that = (ItemProductId) o;
        return Objects.equals(item, that.item) && Objects.equals(productInfo, that.productInfo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(item, productInfo);
    }

    public void setItemProductId(ItemModel item) {
        this.item = item;
    }

}

package com.example.innoteq.model;

import com.example.innoteq.model.junctionModel.ItemProductModel;
import com.example.innoteq.pojo.ItemPojo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Builder
@Entity
@Table(name = "item")
@Data
@AllArgsConstructor
public class ItemModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private Integer price;

    @OneToMany(mappedBy = "item", fetch = FetchType.EAGER)
    private List<ItemProductModel> itemProducts;

    private Long personId;
    private Long saleId;
    private String personName;
    private Date datetime;

    public ItemModel(){
        // constructor for controller class
    }

    public ItemModel(ItemPojo itemPojo) {
        this.itemId = itemPojo.getItemId();
        this.productName = itemPojo.getProductName();
        this.price = itemPojo.getPrice();
        this.quantity = itemPojo.getQuantity();
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Long getSaleId() {
        return saleId;
    }

    public void setSaleId(Long saleId) {
        this.saleId = saleId;
    }

    public String getPersonName() {
        return personName;
    }

    public Date getDatetime(){
        return datetime;
    }

}
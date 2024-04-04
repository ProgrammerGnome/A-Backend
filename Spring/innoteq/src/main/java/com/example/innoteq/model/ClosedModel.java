package com.example.innoteq.model;

import com.example.innoteq.pojo.ClosedPojo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Entity
@Table(name = "closed")
@Data
@AllArgsConstructor
public class ClosedModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_id")
    private Long saleId;

    @Column(name = "person_name")
    private String personName;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private Integer price;

    @Column(name = "datetime")
    private Date datetime;

    @Column(name = "closed_date")
    private Date closedDate;

    @Column(name = "person_id")
    private Long personId;

    public ClosedModel() {
        // constructor for controller class
    }

    public ClosedModel(ClosedPojo closedPojo) {
        this.saleId = closedPojo.getSaleId();
        this.personName = closedPojo.getPersonName();
        this.productName = closedPojo.getProductName();
        this.quantity = closedPojo.getQuantity();
        this.price = closedPojo.getPrice();
        this.datetime = closedPojo.getDatetime();
        this.closedDate = closedPojo.getClosedDate();
    }

    public void setSaleId(Long saleId) {
        this.saleId = saleId;
    }
    public void setPersonName(String personName) {
        this.personName = personName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
    public void setDatetime(Date datetime){
        this.datetime = datetime;
    }
    public void setClosedDate(Date closedDate){
        this.closedDate = closedDate;
    }
}
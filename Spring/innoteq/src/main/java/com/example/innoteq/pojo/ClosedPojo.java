package com.example.innoteq.pojo;

import com.example.innoteq.model.ClosedModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClosedPojo {

    private Long saleId;
    private String personName;
    private String productName;
    private Integer quantity;
    private Integer price;
    private Date datetime;
    private Date closedDate;

    public ClosedPojo(ClosedModel closedModel){
        this.saleId = closedModel.getSaleId();
        this.personName = closedModel.getPersonName();
        this.productName = closedModel.getProductName();
        this.quantity = closedModel.getQuantity();
        this.price = closedModel.getPrice();
        this.datetime = closedModel.getDatetime();
        this.closedDate = closedModel.getClosedDate();
    }
}
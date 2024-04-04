package com.example.innoteq.pojo;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.model.PersonModel;
import com.example.innoteq.model.SaleModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalePojo {

    private Long saleId;
    private PersonModel personModel;
    private ItemModel itemModel;
    private Date datetime;

    public SalePojo(SaleModel saleModel){
        this.saleId = saleModel.getSaleId();
        this.personModel = saleModel.getPersonModel();
        //this.itemModel = saleModel.getItemModel();
        this.datetime = saleModel.getDatetime();
    }
}
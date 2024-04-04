package com.example.innoteq.model;

import com.example.innoteq.pojo.SalePojo;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.List;

@Builder
@Entity
@Table(name = "sale")
@Data
public class SaleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_id")
    private Long saleId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "person_id")
    private PersonModel personModel;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "item_id")
    private ItemModel itemModel;

    @Column(name = "datetime")
    private Date datetime;

    @Transient
    private List<ItemModel> itemModels;

    public SaleModel() {
        // constructor for controller class
    }

    public SaleModel(SalePojo salePojo) {
        this.saleId = salePojo.getSaleId();
        this.personModel = salePojo.getPersonModel();
        //this.itemModel = salePojo.getItemModel();
        this.datetime = salePojo.getDatetime();
    }

    public SaleModel(Long saleId, PersonModel personModel, ItemModel itemModel, Date datetime, List<ItemModel> itemModels) {
        this.saleId = saleId;
        this.personModel = personModel;
        this.itemModel = itemModel;
        this.datetime = datetime;
        this.itemModels = itemModels;
    }

    public void setSaleId(Long saleId) {
        this.saleId = saleId;
    }

    public void setPersonModel(PersonModel personModel) {
        this.personModel = personModel;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

}

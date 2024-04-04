package com.example.innoteq.model.forServerOnly;

import com.example.innoteq.model.ItemModel;
import com.example.innoteq.model.PersonModel;

import java.util.List;

public class PersonItemModel {
    private PersonModel personModel;
    private ItemModel itemModel;
    private List<ItemModel> itemModels;

    public PersonItemModel(){
        // constructor for controller class
    }

    public PersonModel getPersonModel() {
        return this.personModel;
    }
    public ItemModel getItemModel() {
        return this.itemModel;
    }

    public List<ItemModel> getItemModels() {
        return this.itemModels;
    }
}

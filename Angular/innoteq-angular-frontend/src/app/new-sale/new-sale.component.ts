import { Component, OnInit } from '@angular/core';
import { NewSaleService } from '../service/new-sale.service';
import {ngDebug} from "@angular/cli/src/utilities/environment-options";

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css'],
})
export class NewSaleComponent implements OnInit {
  personName: string = '';
  inputs: { quantity: number | null; productName: string | null }[] = [{ quantity: null, productName: null }];
  productOptions: string[] = ['szar', 'fos'];

  constructor(private newSaleService: NewSaleService) {}

  ngOnInit() {
    this.fetchProductOptions();
    this.addInput();
  }

  submitForm() {
    console.log("submit megíhvva")
    const personItemData = {
      personModel: {
        personName: this.personName
      },
      itemModels: this.inputs.map(input => ({
        productName: input.productName,
        quantity: input.quantity
      }))
    };

    this.newSaleService.saveNewSale(personItemData).subscribe(
      response => {
        console.log(response);
        alert('Mentve az adatbázisba!');
      },
      error => {
        console.error(error);
      }
    );
  }

  addInput() {
    console.log("addInput meghívva")
    this.inputs.push({ quantity: null, productName: null });
  }

  removeInput(index: number) {
    console.log("removeInput meghívva")
    this.inputs.splice(index, 1);
  }

  fetchProductOptions() {
    this.newSaleService.getProductOptions().subscribe(
      (response: any[]) => {
        this.productOptions = response.map((product: any) => product.productName);
      },
      error => {
        console.error(error);
      }
    );
  }

  public fun(){
    console.log("fun")
  }

}

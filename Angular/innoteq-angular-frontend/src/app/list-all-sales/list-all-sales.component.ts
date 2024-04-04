// items.component.ts

import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../service/list-all-sales.service";
// import axios from 'axios';

@Component({
  selector: 'app-list-all-sales',
  template: `

      <div>
        <br />
        <h4><p style="color: white;">Lezajlott, de még nem lezárt értékesítések</p></h4>
        <p>
          A lezajlott, de még nem lezárt rendeléseket itt tudja megtekinteni és módosítani, lezárni és törölni.
          Ez a felsorolás a vásárlás pontos ideje szerint van rendezve (legújabbak felül). <br />
          Ha szeretne utólag új terméket felvenni egy értékesítéshez, kövesse az alábbiakat: <br />
          Adja hozzá azokat az oldal címére kattintva, majd itt a táblázatban legfelűl fog megjelenni,
          és módosíthatja megfelelőre a dátumidejét.
        </p>
        <table class="table">
          <thead>
            <tr>
              <th>Dolgozó neve</th>
              <th>Vásárlás pontos ideje</th>
              <th>Terméknév</th>
              <th>Mennyiség</th>
              <th>Végösszeg</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items; let i = index" [attr.key]="item.itemId">
              <td><input type="text" [(ngModel)]="item.personName" [disabled]="!item.editable" /></td>
              <td><input type="datetime" [(ngModel)]="item.datetime" [disabled]="!item.editable" /></td>
              <td><input type="text" [(ngModel)]="item.productName" [disabled]="!item.editable" /></td>
              <td><input type="number" [(ngModel)]="item.quantity" [disabled]="!item.editable" /></td>
              <td><input type="number" [(ngModel)]="item.price" [disabled]="!item.editable" /></td>
              <td>
                <button (click)="editItem(item)">{{ item.editable ? 'Mentem a módosítást' : 'Módosítás' }}</button>
                <button (click)="closeItem(item)">{{ item.editable ? 'Mindnképp lezárom' : 'Lezárás' }}</button>
                <button (click)="deleteItem(item)">{{ item.editable ? 'Mindenképp törlöm' : 'Törlés' }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

  `,
  styles: [
    `
      .table {
        border-collapse: collapse;
        width: 100%;
        border: 1px solid #ddd;
      }

      .table td {
        padding: 8px;
        text-align: center;
        border-bottom: 1px solid #ddd;
      }

      .table th {
        background-color: #f2f2f2;
      }

      table {
        background-color: #b6d6ff;
        padding: 1%;
        width: 100%;
      }

      div {
        background-color: #4695d6;
      }
    `,
  ],
})
export class ListAllSalesComponent implements OnInit {
  items: any[] = [];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.fetchItemsWithPersonAndSaleData();
  }

  fetchItemsWithPersonAndSaleData() {
    this.itemsService.getItemsWithPersonAndSaleData().subscribe(
      (response) => {
        this.items = response.items.map((item: any) => {
          return {
            itemId: item[0],
            personId: item[1],
            saleId: item[2],
            personName: item[3],
            datetime: item[4],
            productName: item[5],
            quantity: item[6],
            price: item[7],
            editable: false,
          };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editItem(item: any) {
    if (!item.editable) {
      item.editable = true;
    } else {
      this.itemsService.updateItem(item).subscribe(
        () => {
          console.log('Mentés:', item);
          item.editable = false;
          alert('Sikeres módosítás!');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  deleteItem(item: any) {
    if (!item.editable) {
      item.editable = true;
    } else {
      this.itemsService.deleteItem(item).subscribe(
        () => {
          console.log('Törlés:', item);
          item.editable = false;
          alert('Sikeres törlés!');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  closeItem(item: any) {
    if (!item.editable) {
      item.editable = true;
    } else {
      this.itemsService.closeItem(item).subscribe(
        () => {
          console.log('Lezárás:', item);
          item.editable = false;
          alert('Sikeres lezárás!');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}

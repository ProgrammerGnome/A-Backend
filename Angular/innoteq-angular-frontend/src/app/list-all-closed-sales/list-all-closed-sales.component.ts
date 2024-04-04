import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-list-all-closed-sales',
  template: `

      <div>
        <br />
        <h4>Lezárt értékesítések</h4>
        <p>A lezárás pontos ideje szerint rendezve (legrégebben lezártak alul).</p>
        <table class="table">
          <thead>
            <tr>
              <th>Dolgozó neve</th>
              <th>Terméknév</th>
              <th>Mennyiség</th>
              <th>Végösszeg</th>
              <th>Vásárlás pontos ideje</th>
              <th>Lezárás pontos ideje</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items; let i = index">
              <td>{{ item[1] }}</td>
              <td>{{ item[2] }}</td>
              <td>{{ item[3] }}</td>
              <td>{{ item[4] }}</td>
              <td>{{ item[5] }}</td>
              <td>{{ item[6] }}</td>
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
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      .table th {
        background-color: #f2f2f2;
      }

      div {
        background-color: red;
      }
    `,
  ],
})
export class ListAllClosedSalesComponent implements OnInit {
  items: any[] = [];

  ngOnInit() {
    this.fetchItemsWithPersonAndSaleData();
  }

  fetchItemsWithPersonAndSaleData() {
    axios
      .get('/closed-sale-table')
      .then((response) => {
        this.items = response.data.items;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


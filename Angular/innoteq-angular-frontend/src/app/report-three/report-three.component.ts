// product-consumption-report.component.ts

import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-report-three',
  template: `

      <div>
        <h2><p style="color: white;">Termékek fogyásának riportja</p></h2>
        <p>Rendezve a fogyás mennyiségére fordítottan (legnagyobbak felül).</p>
        <h4>A jelenlegi hónap: {{ currentMonth }}</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Terméknév</th>
              <th>Fogyás mennyisége</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let sale of sales; let i = index" [attr.key]="i">
              <td>{{ sale[0] }}</td>
              <td>{{ sale[2] }}</td>
            </tr>
          </tbody>
        </table>
      </div>

  `,
  styles: [
    `
      div {
        background-color: #4695D6;
        padding: 1%;
        width: 60%;
      }

      table {
        background-color: white;
        width: 100%;
      }

      .table {
        border-collapse: collapse;
        width: 100%;
        border: 1px solid #ddd;
      }

      .table th,
      .table td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      .table th {
        background-color: #f2f2f2;
      }
    `,
  ],
})
export class ReportThreeComponent implements OnInit {
  sales: any[] = [];
  currentMonth: string = '';

  ngOnInit() {
    this.fetchProcuctQuantityByCurrentMonth();
    const currentDate = new Date();
    const monthNames = [
      'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
      'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
    ];
    this.currentMonth = monthNames[currentDate.getMonth()];
  }

  fetchProcuctQuantityByCurrentMonth() {
    axios
      .get('/3feladat')
      .then((response) => {
        this.sales = response.data.sales;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


// consumption-report.component.ts

import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-report-two',
  template: `

      <div>
        <h2><p style="color: white;">Dolgozói fogyasztásriport</p></h2>
        <h4>A jelenlegi hónap: {{ currentMonth }}</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Dolgozó neve</th>
              <th>Fogyasztás értéke</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let person of persons; let i = index" [attr.key]="i">
              <td>{{ person[0] }}</td>
              <td>{{ person[1] }}</td>
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

      .table th,
      .table td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      .table th {
        background-color: #f2f2f2;
      }

      div {
        background-color: #4695D6;
        padding: 1%;
        width: 60%;
      }

      table {
        background-color: white;
        width: 100%;
      }
    `,
  ],
})
export class ReportTwoComponent implements OnInit {
  persons: any[] = [];
  currentMonth: string = '';

  ngOnInit() {
    this.fetchPersonSalesByCurrentMonth();
    const currentDate = new Date();
    const monthNames = [
      'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
      'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
    ];
    this.currentMonth = monthNames[currentDate.getMonth()];
  }

  fetchPersonSalesByCurrentMonth() {
    axios
      .get('/2feladat')
      .then((response) => {
        this.persons = response.data.persons;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


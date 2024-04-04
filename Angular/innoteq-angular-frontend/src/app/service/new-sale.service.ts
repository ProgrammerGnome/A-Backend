import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewSaleService {
  private baseUrl: string = 'http://localhost:8080'; // Update the base URL

  constructor(private http: HttpClient) {}

  saveNewSale(personItemData: any): Observable<any> {
    const url = `${this.baseUrl}/save-new-sale`; // Update the URL
    return this.http.post(url, personItemData);
  }

  getProductOptions(): Observable<any[]> {
    const url = `${this.baseUrl}/productInfo`; // Update the URL
    return this.http.get<any[]>(url);
  }
}

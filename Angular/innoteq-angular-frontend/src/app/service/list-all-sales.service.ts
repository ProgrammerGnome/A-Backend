// items.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private apiUrl = 'http://localhost:8080'; // A te backend URL-ed

  constructor(private http: HttpClient) {}

  getItemsWithPersonAndSaleData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/items-with-person-and-sale-data`);
  }

  updateItem(updatedItem: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/update-item`, updatedItem);
  }

  deleteItem(deletedItem: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/delete-item`, deletedItem);
  }

  closeItem(closedItem: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/close-item`, closedItem);
  }
}

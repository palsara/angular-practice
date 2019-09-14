import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl: string = 'http://localhost:3000/api/orders';
  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOne(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  update(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/${order.id}`, order);
  }

  remove(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/delete/${id}`);
  }

}

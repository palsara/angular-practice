import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  remove(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/delete/${id}`);
  }


}

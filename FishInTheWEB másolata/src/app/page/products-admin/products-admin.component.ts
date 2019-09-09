import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { from } from 'rxjs';
@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {

  list: Product[] = [];
  productList: Product[] = [];
  orderKey: string = '';
  orderDirection: number = 1;
  changeCounter: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(
      orders => this.list = orders,
      err => console.error(err))
  }
  
  setSorterKey(key: string): void {
    if (key === this.orderKey) {
      this.orderDirection = this.orderDirection === 1 ? -1 : 1;
    } else {
      this.orderDirection = 1;
    }
    this.orderKey = key;
  }

}

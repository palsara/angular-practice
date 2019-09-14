import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  newOrder: Order = new Order();
  order: Order = new Order();
  product: Product = new Product;
  orderList: Order[] = [];
  productList: Product[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.orderService.getAll().subscribe(
      orders => {
        this.orderList = orders;
      }
    );
    this.productService.getAll().subscribe(
      products => {
        this.productList = products;
      }
    )
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.onAdd();
  }
  
  onAdd() {
    this.getOneProduct(this.newOrder.product);
    this.newOrder.category =this.product.category;
    console.log(this.newOrder.category);
    this.orderService.create(this.newOrder).subscribe(
      order => {
        this.orderList.push(order);
      }
    )
  }

  getOneProduct(id: number) {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].id == id) {
        this.product = this.productList[i];
      }
    }
    return this.product;
  }


}

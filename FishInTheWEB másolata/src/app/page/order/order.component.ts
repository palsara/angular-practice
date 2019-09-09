import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  newOrder: Order = new Order();
  order: Order = new Order();
  product: Product = new Product;
  orderList: Order[] = [];
  constructor(
    private ar: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.ar.params.forEach(
      params => {
        this.getOneProduct(params.id)
      }
    );
    this.orderService.getAll().subscribe(
      orders => {

        this.orderList = orders
        console.log(this.orderList)
      })
  }

  getOneProduct(id: number) {
    this.productService.getOne(id).subscribe(
      product => {
        this.product = product;
      },
    )
  }
  onAdd() {
    this.newOrder.product = this.product.id,
      this.newOrder.category = this.product.category,
      console.log(this.newOrder)
    this.orderService.create(this.newOrder).subscribe(
      order => {
        this.orderList.push(order)
      }
    )
  }
}

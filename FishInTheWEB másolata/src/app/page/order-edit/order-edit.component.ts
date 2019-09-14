import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  order: Order = new Order();
  product: Product = new Product();
  orderList: Order[] = [];
  productList: Product[] = [];


  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService
  ) {
    this.ar.params.forEach(params => {
      this.getOneOrder(params.id);
    });
  }

  ngOnInit() {
    this.productService.getAll().subscribe(
      products => this.productList = products
    );
    this.orderService.getAll().subscribe(
      orders => {
        this.orderList = orders;
      }
    );
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.getOneProduct(this.order.product);
    this.onUpdate();
  }

  onUpdate() {
    this.order.category = this.product.category;
    this.orderService.update(this.order).subscribe(
      response => {
        this.router.navigate(["../../order"], { relativeTo: this.ar });
      },
      err => console.error(err)
    )
  }

  getOneOrder(id: number) {
    this.orderService.getOne(id).subscribe(
      order => {
        this.order = order;
      },
      err => console.error(err)
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

  onCancel() {
    this.router.navigate(["../../order"], { relativeTo: this.ar });
  }
}

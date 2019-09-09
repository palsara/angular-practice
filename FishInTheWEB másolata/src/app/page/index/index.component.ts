import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  productList: Product[] = [];
  productNumber: number = 0;
  constructor(private productService: ProductService) {

    this.productService.getAll().subscribe(
      products => {
        this.productList = products;
      },

      err => console.error(err)
    )
  }

  ngOnInit() {
    this.productService.getAll().subscribe(
      products => this.productList = products,
      err => console.error(err)
    )
  }

  productNum(category) {
    this.productNumber = 0;
    for (let i = 0; i < this.productList.length; i += 1) {
      if (this.productList[i].category == category) {
        this.productNumber += 1;
      }
    }
    return this.productNumber;
  }
}

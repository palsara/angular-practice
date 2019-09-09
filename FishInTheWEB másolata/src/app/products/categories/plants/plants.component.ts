import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  productList: Product[] = [];
  filteredProductList: [];
  // productList$: Observable<any> = this.productService.getAll();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(
      products => {
        this.productList = products;
      },

      err => console.error(err)
    )
  }
}
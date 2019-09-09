import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

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

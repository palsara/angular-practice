import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/service/order.service';
@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {

  newProduct: Product = new Product();
  productList: Product[] = [];

  constructor(
    private ar: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() { }


  onCancel() {
    this.router.navigate(["/admin/products"]);
  }
  onCreate(): void {

    this.newProduct.id = this.findNextID();
    this.productService.create(this.newProduct).subscribe(
      response => {
        this.router.navigate(["/admin/products"]);

      },
      err => console.error(err)
    )
  }
  findNextID(): number {
    let greatestID = 1;
    this.productService.getAll().subscribe(
      productList => {
        this.productList = productList;
        for (let i = 0; i < this.productList.length; i += 1) {
          if (this.productList[i].id > greatestID) {
            greatestID = this.productList[i].id;
          }
        }
      }
    )
    return greatestID + 1;
  }

}



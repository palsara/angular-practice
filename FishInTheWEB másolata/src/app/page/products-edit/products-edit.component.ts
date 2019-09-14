import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { DialogService } from '../../service/dialog.service';
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  product: Product = new Product();

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private productService: ProductService,
    private dialogService: DialogService
  ) {
    this.ar.params.forEach(params => {
      this.getOneProduct(params.id);
    });
  }

  ngOnInit() {
  }

  getOneProduct(id: number) {
    this.productService.getOne(id).subscribe(
      result => {
        this.product = result;

      },
      err => console.error(err)
    )
  }

  onSave() {
    this.productService.update(this.product).subscribe(
      response => {
        this.router.navigate(["/admin/products"]);
      },
      err => console.error(err)
    )
  }
  onReset() {
    this.getOneProduct(this.product.id);
  }
  onDelete() {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        this.productService.remove(this.product.id).subscribe(
          response => {
            this.router.navigate(["admin/products"]);
          },
          err => console.error(err)
        )
      }
    }
    )
  }
}

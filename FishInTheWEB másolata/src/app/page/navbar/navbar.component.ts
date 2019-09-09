import { Component, OnInit, Input } from '@angular/core';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  productList: Product[] = []

  @Input() opacity: number = 1;

  faFish = faFish;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getAll().subscribe(
      products =>
        this.productList = products,
      err => console.error(err)
    );
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

}



import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Order } from 'src/app/model/order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  product: Product;
  productList: Product[] = [];
  orderList: Order[] = [];
  newReview: any = {
    text: '',
    rate: '',
    from: ''
  };
  avg: number = 0;


  showImage() {
    let curImage = document.getElementById('currentImg');

    curImage.setAttribute('src', this.product.img2);
  }
  showImage2() {
    let curImage = document.getElementById('currentImg');

    curImage.setAttribute('src', this.product.img);
  }
  constructor(
    private ar: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) {
    this.ar.params.forEach(
      params => {
        this.getOneProduct(params.id)
        console.log(this.product);

      }
    );
  }

  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }

  getOneProduct(id: number) {
    this.productService.getOne(id).subscribe(
      product => {
        this.product = product;
        this.avg = this.countAvg(product);
      },
    )
  }

  showReview() {
    document.getElementById("review").classList.toggle("show");
  }

  onCancel() {
    document.getElementById("review").classList.toggle("show");
  }


  leaveReview() {
    this.product.reviews.push(this.newReview);
    this.productService.update(this.product).subscribe(
      response => {
        document.getElementById("review").classList.toggle("show");
        this.newReview = {};
        let nList = document.querySelectorAll("input[type=radio]");
        console.log(nList);
        // for (var checkbox of nList) {
        //   checkbox.checked = false;
        // };
        Array.prototype.forEach.call(nList, function (checkbox) {
          checkbox.checked = false;
        });
        this.avg = this.countAvg(this.product);
      },
      err => console.error(err)
    )
  }


  rating: number;
  itemId: number;
  ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: any;

  onClick(rating: number): void {
    this.newReview.rate = rating;
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }

  countAvg(product) {
    let avg: number;
    let sum: number = 0;
    let count: number = 0;
    let nums = product.reviews.map(item => {
      return item.rate
    });
    if (nums[0] == undefined) {
      avg = 0;
    } else {
      for (let i = 0; i < nums.length; i++) {
        let num = parseInt(nums[i]);
        sum += num;
        count += 1;
      }
      avg = sum / count;
    }
    return avg;
  }
}
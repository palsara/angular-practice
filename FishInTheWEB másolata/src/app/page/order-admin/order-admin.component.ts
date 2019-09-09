import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order } from 'src/app/model/order';
import { faShoppingCart, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { DialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {

  faShoppingCart = faShoppingCart;

  
  list: Order[] = [];
  productList: Product[] = [];
  // list$: Observable<any> = this.orderService.getAll();
  allOrders: number;
  fishes: number;
  corals: number;
  plants: number;
  tools: number;
  aquariums: number;
  fishesP: number;
  coralsP: number;
  plantsP: number;
  toolsP: number;
  aquariumsP: number;
  changeCounter: number = 0;
  orderKey: string = '';
  orderDirection: number = 1;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.productService.getAll().subscribe(
      products => 
      this.productList = products,
      err => console.error(err)
    );
    this.orderService.getAll().subscribe(
      orders => {
        this.list = orders;
        this.allOrders = this.countOrders(orders);
        this.fishes = this.countCategories(orders, "fishes");
        this.corals = this.countCategories(orders, "corals");
        this.tools = this.countCategories(orders, "tools");
        this.plants = this.countCategories(orders, "plants");
        this.aquariums = this.countCategories(orders, "aquariums");
        this.fishesP = this.percentage(orders, this.fishes);
        this.coralsP = this.percentage(orders, this.corals);
        this.toolsP = this.percentage(orders, this.tools);
        this.plantsP = this.percentage(orders, this.plants);
        this.aquariumsP = this.percentage(orders, this.aquariums);
        this.dateFormatter(orders);
      },
      err => console.error(err)
    )
  }


  countOrders(orders: Order[]) {
    return orders.length;
  }


  countCategories(orders: Order[], cat: string) {
    let num: number = 0;
   for (let i = 0; i < orders.length; i++){
     if (orders[i].category == cat){
       num = num+orders[i].quantity;
     }
   }
    return num;
  }

  percentage(orders: Order[], catLength: number) {
    let percentage = catLength*100/orders.length;
    return percentage;
  }


  onDelete(order: Order) {
    // if (confirm('Are you sure to delete this record?')) {
    //   this.orderService.remove(order.id).subscribe(
    //     response => {
    //       let index = this.list.indexOf(order);
    //       this.list.splice(index, 1);
    //       this.changeCounter++;
    //     },
    //     err => console.error(err)
    //   )
    // }

    this.dialogService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        this.orderService.remove(order.id).subscribe(
          response => {
            let index = this.list.indexOf(order);
            this.list.splice(index, 1);
            this.changeCounter++;
          },
          err => console.error(err)
        )
      }
    });

  }

  dateFormatter(orders: Order[]){
    for (let i = 0; i < orders.length; i++){
      orders[i].date = orders[i].insdate.toString().substring(0, 10);
    }
    return orders;
  }

  setSorterKey(key: string): void {
    if (key === this.orderKey) {
      this.orderDirection = this.orderDirection === 1 ? -1 : 1;
    } else {
      this.orderDirection = 1;
    }
    this.orderKey = key;
  }
}

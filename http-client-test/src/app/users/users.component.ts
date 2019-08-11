import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title = 'Data Table';
  userList: User[]=[];
  userSubscription: Subscription;
  filterPhrase: string = '';
  orderKey: string = '';
  orderDirection: number = 1;
 changeCounter: number = 0;


  constructor(
    private userService: UserService

  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.getAll().subscribe(
      users => this.userList = users
    );
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  confirm(user: User) {
    let result = confirm("Want to delete?");
    if (result) {
      this.userService.remove(user.id).subscribe(
        response => {
          let index = this.userList.indexOf(user);
          this.userList.splice(index, 1);
          this.changeCounter++
        }
      )
    }
  }

  onOrder(key: string): void {
    if (key === this.orderKey) {
      this.orderDirection = this.orderDirection == -1 ? 1 : -1;
    } else {
      this.orderDirection = 1;
    }
    this.orderKey = key;
  }
}

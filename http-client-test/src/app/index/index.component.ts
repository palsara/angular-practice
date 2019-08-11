import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  userList: User[] = [];
  userSubscription: Subscription;


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

  allUsers() {
    let allUsersNum = this.userList.length;
    return allUsersNum

  }
  activeUsers() {
    let activeUsersArray = [];
    let activeUsersNum = 0
    for (let i = 0; i < this.userList.length; i += 1) {
      if (this.userList[i].isActive == true) {
        activeUsersArray.push(this.userList[i])
      }
    }
    activeUsersNum = activeUsersArray.length;
    return activeUsersNum;
  }

  inactiveUsers() {
    let inactiveUsersArray = [];
    let inactiveUsersNum = 0;
    for (let i = 0; i < this.userList.length; i += 1) {
      if (this.userList[i].isActive == false) {
        inactiveUsersArray.push(this.userList[i])
      }
    }
    inactiveUsersNum = inactiveUsersArray.length;
    return inactiveUsersNum
  }

  usersBalance() {
    let usersBalanceNum = 0;
    for (let i = 0; i < this.userList.length; i += 1) {
      this.userList[i].balance = parseFloat(this.userList[i].balance.toString().replace('$', '').replace(',', ''))
      usersBalanceNum += this.userList[i].balance
    }
    return usersBalanceNum;
  }

  favoriteFruitApple() {
    let favoriteFruitArray = [];
    let favoriteFruitApple = 0;
    for (let i = 0; i < this.userList.length; i += 1) {
      if (this.userList[i].favoriteFruit == 'apple') {
        favoriteFruitArray.push(this.userList[i])
      }
    }
    favoriteFruitApple = favoriteFruitArray.length;
    return favoriteFruitApple
  }
    favoriteFruitStrawberry() {
      let favoriteFruitArray = [];
      let favoriteFruitStrawberry = 0;
      for (let i = 0; i < this.userList.length; i += 1) {
        if (this.userList[i].favoriteFruit == 'strawberry') {
          favoriteFruitArray.push(this.userList[i])
        }
      }
      favoriteFruitStrawberry = favoriteFruitArray.length;
      return favoriteFruitStrawberry;
    }
    favoriteFruitBanana() {
      let favoriteFruitArray = [];
      let favoriteFruitBanana = 0;
      for (let i = 0; i < this.userList.length; i += 1) {
        if (this.userList[i].favoriteFruit == 'banana') {
          favoriteFruitArray.push(this.userList[i])
        }
      }
      favoriteFruitBanana = favoriteFruitArray.length;
      return favoriteFruitBanana;
    }
  
}

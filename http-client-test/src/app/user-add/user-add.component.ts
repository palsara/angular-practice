import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})

export class UserAddComponent implements OnInit {
  newUser: User=new User();
  userList: User[] = [];
  user: User = new User;
  userSubscription: Subscription;
  changeCounter:number=0;

  constructor(
    private us: UserService
  ) {
  }

  ngOnInit() {
    this.userSubscription=this.us.getAll().subscribe(
      users => this.userList = users
    );
  }

  onAdd() {
    this.us.create(this.newUser).subscribe(
      user => {
        this.userList.push(user),
        this.changeCounter++
      }
    )
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();//megakadályozza, hogy frissüljön az oldal a submit gomb lenyomására
    console.log('itt hívom meg a service update metódusát!', this.user);
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User();
  changeCounter:number=0;

  constructor(
    private ar: ActivatedRoute,
    private us: UserService,
    private router:Router
  ) {
    this.ar.params.forEach(params => {
      this.user = this.us.get(params.id)
    });
  }

  ngOnInit() {
  }
  
  onUpdate(user: User) {
    this.us.update(user = user).subscribe(
      response => {
        console.log(response),
        this.router.navigateByUrl('/users')


      }
    )
  }
}

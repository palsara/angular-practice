import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { IndexComponent } from './index/index.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { FilterPipe } from './pipe/filter.pipe';
import { OrderPipe } from './pipe/order.pipe';

const appRoutes: Routes = [
  {
    path: "",
    component: IndexComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "users/:id",
    component: UserEditComponent
  },
  {
    path: "new",
    component: UserAddComponent
  },
  {
    path: "**",
    component: IndexComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    UsersComponent,
    UserEditComponent,
    UserAddComponent,
    FilterPipe,
    OrderPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

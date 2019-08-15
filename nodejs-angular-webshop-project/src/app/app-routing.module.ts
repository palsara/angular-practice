import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
<<<<<<< HEAD
import { AdminComponent } from './page/admin/admin.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'admin/order', component: AdminComponent },
  { path: '**', component: IndexComponent },

=======
import { OrderAdminComponent } from './page/order-admin/order-admin.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'admin/order', component: OrderAdminComponent},
  {path: '**', component: IndexComponent}
>>>>>>> 8273899271466fbc7fbe2762e13e36b2d5a14bd7
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

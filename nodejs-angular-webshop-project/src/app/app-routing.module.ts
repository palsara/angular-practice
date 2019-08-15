import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { AdminComponent } from './page/admin/admin.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'admin/order', component: AdminComponent },
  { path: '**', component: IndexComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

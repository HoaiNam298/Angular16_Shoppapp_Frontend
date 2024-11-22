import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { OrderAdminComponent } from './order/order.admin.component';
import { ProductAdminComponent } from './product/product.admin.component';
import { CategoryAdminComponent } from './category/category.admin.component';
import { DetailOrderAdminComponent } from './detail-order/detail-order.component';

const routes: Routes = [
  { path: 'admin', 
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrderAdminComponent
      },
      {
        path: 'products',
        component: ProductAdminComponent
      },
      {
        path: 'orders/:id',
        component: DetailOrderAdminComponent
      },
      {
        path: 'categories',
        component: CategoryAdminComponent
      }
    ],
    canActivate: [AdminGuard]
   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

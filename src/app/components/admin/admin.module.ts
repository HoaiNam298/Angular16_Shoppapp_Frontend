import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './order/order.admin.component';
import { ProductAdminComponent } from './product/product.admin.component';
import { CategoryAdminComponent } from './category/category.admin.component';
import { CommonModule } from '@angular/common';
import { DetailOrderAdminComponent } from './detail-order/detail-order.admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    OrderAdminComponent,
    ProductAdminComponent,
    CategoryAdminComponent,
    DetailOrderAdminComponent
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    CommonModule,
    FormsModule
  ],
})
export class AdminModule { }

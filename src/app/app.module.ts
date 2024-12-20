import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenIntercepter } from './intercepters/token.intercepter';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './components/admin/admin.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrderAdminComponent } from './components/admin/order/order.admin.component';
import { ProductAdminComponent } from './components/admin/product/product.admin.component';
import { CategoryAdminComponent } from './components/admin/category/category.admin.component';
import { AdminModule } from './components/admin/admin.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailProductComponent,
    LoginComponent,
    OrderComponent,
    OrderDetailComponent,
    RegisterComponent,
    AppComponent,
    UserProfileComponent,
    // AdminComponent,
    // OrderAdminComponent,
    // ProductAdminComponent,
    // CategoryAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    // NgIf,
    // RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    AdminModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepter,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
    // HomeComponent,
    // DetailProductComponent,
    // OrderComponent,
    // OrderDetailComponent,
    // LoginComponent,
    // RegisterComponent
  ]
})
export class AppModule { }

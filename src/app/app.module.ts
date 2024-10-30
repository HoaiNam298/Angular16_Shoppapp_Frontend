import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailProductComponent,
    LoginComponent,
    OrderComponent,
    OrderConfirmComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgIf,
    RouterOutlet,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [
    LoginComponent,
    // RegisterComponent
  ]
})
export class AppModule { }

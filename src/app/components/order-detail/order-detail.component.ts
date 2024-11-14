import { Component, OnInit } from '@angular/core';
import { enviroment } from 'src/app/enviroments/enviroment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  cartItems: { product: Product, quantity: number } [] = [];
  totalAmount: number = 0;
  couponcode: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    debugger
    const orderId = 9;
    this
  }

  applyCoupon(): void {

  }

}

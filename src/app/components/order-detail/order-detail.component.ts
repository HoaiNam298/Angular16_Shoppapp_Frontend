import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { enviroment } from 'src/app/enviroments/enviroment';
import { OrderDetail } from 'src/app/models/order.detail';
import { Product } from 'src/app/models/product';
import { OrderResponse } from 'src/app/responses/order.response';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderResponse: OrderResponse = {
    id: 0,
    user_id: 0,
    fullname:'',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: new Date(),
    shipping_date: new Date(),
    payment_method: '',
    order_details: []
  }

  cartItems: { product: Product, quantity: number } [] = [];
  totalAmount: number = 0;
  couponcode: string = '';

  constructor(
    private orderService: OrderService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    debugger
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    // Chuyển đổi 'orderId' thành number
    if (!id) {
      console.error('Order ID is null or undefined');
      return;
    }
    const orderId = +id;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        this.orderResponse = {
          ...response
        };
        debugger;
        this.orderResponse.order_details = response.order_details.map((order_detail: any) =>{
          order_detail.product.thumbnail = `${enviroment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
          return order_detail;
        })
        ////Nếu shipping_date: string thì dùng
        // this.orderResponse.shipping_date = new Date(
        //   response.shipping_date[0],
        //   response.shipping_date[1] - 1,
        //   response.shipping_date[2]
        // );
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error("Error fetching detail: ", error);
      }
    })
  }

  applyCoupon(): void {

  }

}

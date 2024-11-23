import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDTO } from 'src/app/dtos/order.dto';
import { enviroment } from 'src/app/enviroments/enviroment';
import { OrderDetail } from 'src/app/models/order.detail';
import { OrderResponse } from 'src/app/responses/order.response';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.admin.component.html',
  styleUrls: ['./detail-order.admin.component.scss']
})
export class DetailOrderAdminComponent implements OnInit{

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

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    debugger;
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
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

  saveOrder() {
    debugger;
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.updateOrder(orderId, new OrderDTO(this.orderResponse)).subscribe({
      next: (response: any) => {
        debugger;
        console.log('Order updated successfully: ', response);
        this.router.navigate(['../'], { relativeTo: this.route });
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

}

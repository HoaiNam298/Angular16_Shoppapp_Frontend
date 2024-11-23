import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { Product } from '../models/product';
import { OrderDTO } from '../dtos/order.dto';
import { Order } from '../models/order';
import { OrderResponse } from '../responses/order.response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private apiUrl = `${enviroment.apiBaseUrl}/orders`;
  private apiGetAllOrders = `${enviroment.apiBaseUrl}/orders/get-orders-by-keyword`;

  constructor(private http: HttpClient) { }

  placeOrder(orderData: OrderDTO): Observable<any> {
    // Gửi yêu cầu đặt hàng
    return this.http.post<Order>(this.apiUrl, orderData);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllOrders(keyword: string,
    page: number,
    limit: number
  ): Observable<OrderResponse[]> {
    const params = new HttpParams()
    .set('keyword', keyword)
    .set('page', page.toString())
    .set('limit', limit.toString());
    return this.http.get<any>(this.apiGetAllOrders, { params });
  }

  updateOrder(orderId: number, orderData: OrderDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}`, orderData);
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderId}`, { responseType: 'text' });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { Product } from '../models/product';
import { OrderDTO } from '../dtos/order.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private apiUrl = `${enviroment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) { }

  placeOrder(orderData: OrderDTO) {
    return this.http.post(this.apiUrl, orderData);
  }
}

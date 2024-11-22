import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiGetProducts = `${enviroment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(keyword: string, categoryId: number, page: number, limit: number): Observable<Product[]> {
    const params = new HttpParams()
        .set('keyword', keyword.toString())
        .set('category_id', categoryId.toString())
        .set('page', page.toString())
        .set('limit', limit.toString());
    return this.http.get<Product[]>(this.apiGetProducts, { params })
  }

  getAllProducts(keyword: string,
    page: number,
    limit: number
  ): Observable<Product[]> {
    const params = new HttpParams()
    .set('keyword', keyword)
    .set('page', page.toString())
    .set('limit', limit.toString());
    return this.http.get<any>(this.apiGetProducts, { params });
  }

  getDetailProduct(productId: number) {
    return this.http.get(`${enviroment.apiBaseUrl}/products/${productId}`);
  }

  getProductsByIds(productIds: number[]): Observable<Product[]> {
    //Chuyển danh sách Id thành một chuỗi và truyền vào params
    debugger
    const params = new HttpParams().set('ids', productIds.join(','));
    return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, { params });
  }
}

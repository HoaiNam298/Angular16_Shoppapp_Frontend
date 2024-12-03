import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
// import { LocalStorageService } from 'ngx-webstorage'

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cart: Map<number, number> = new Map();

  constructor(private productService: ProductService) { 
    //Lấy dữ liệu giỏ hành từ localStorage khi khởi tạo service

    const storedCard = localStorage.getItem(this.getCartKey());
    if(storedCard) {
        this.cart = new Map(JSON.parse(storedCard));
    }
  }

  getCartKey(): string {
    const userResponseJSON = localStorage.getItem('user');
    const userResponse = JSON.parse(userResponseJSON!);
    debugger;
    return `cart: ${userResponse.id}`;
  }

  addToCard(productId: number, quantity: number): void {
    debugger
    if(this.cart.has(productId)) {
        //Nếu sp đã có trong giỏ hàng, tăng số lượng lên
        this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
        //Nếu sp chưa có trong giỏ hành, thêm sp vào với quantity
        this.cart.set(productId, quantity);
    }

    //Sau khi thay đổi giỏ hàng, lưu trữ nó vào localStorage
    this.saveCartToLocalStorage();
  }

  getCart(): Map<number, number> {
    return this.cart;
  }

  //Lưu trữ giỏ hành vào localStorage
  saveCartToLocalStorage(): void {
    debugger
    localStorage.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }

  setCart(cart: Map<number, number>) {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cart.clear();
    this.saveCartToLocalStorage();
  }

  refreshCart(): void {
    const storedCart = localStorage.getItem(this.getCartKey());
    if(storedCart) {
      this.cart = new Map(JSON.parse(storedCart));
    } else {
      this.cart = new Map<number, number>();
    }
  }
}

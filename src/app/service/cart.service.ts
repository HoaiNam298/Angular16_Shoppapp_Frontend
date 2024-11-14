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
    const storedCard = localStorage.getItem('cart');
    if(storedCard) {
        this.cart = new Map(JSON.parse(storedCard));
    }
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
    alert("Sucessfully")
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
  }

  clearCart(): void {
    this.cart.clear();
    this.saveCartToLocalStorage();
  }
}

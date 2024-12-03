import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDTO } from 'src/app/dtos/order.dto';
import { enviroment } from 'src/app/enviroments/enviroment';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup; //đối tượng FormGroup để quản lý dữ liệu form
  cartItems: { product: Product, quantity: number } [] = [];
  totalAmount: number = 0;
  couponcode: string = '';
  private cart: Map<number, number> = new Map();
  orderData: OrderDTO = {
    user_id: 0,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    order_date: new Date,
    status: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',
    cart_items: []
  }

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
  ) {
    //Tạo formgroup và các FormControl tương ứng
    this.orderForm = this.fb.group({
      fullname: ['Nguyen Van A', Validators.required],
      email: ['vana@gmail.com', [Validators.required, Validators.email]],
      phone_number: ['1122334455', [Validators.required, Validators.minLength(6)]],
      address: ['abcdef', [Validators.required, Validators.minLength(5)]],
      note: [''],
      couponcode: [''],
      shipping_method: ['express'],
      payment_method: ['cod']
    })
  }

  ngOnInit(): void {
    debugger;
    // this.cartService.clearCart();
    this.orderData.user_id = this.tokenService.getUserId();
    //Lấy danh sách sản phẩm từ giỏ hàng
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); //Chuyển danh sách Id từ Map giỏ hàng
    if(productIds.length === 0) {
      return;
    }
    //Gọi service để lấy thông tin sản phẩm dựa trên danh sách Id
    debugger
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        //Lấy thông tin sản phẩm và số lượng từ danh sách sản phẩm trong giỏ hàng
        debugger
        this.cartItems = productIds.map((productId) => {
          debugger
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          }
        });
        console.log("ok")
      },
      complete: () => {
        debugger;
        this.calculateTotal();
      },
      error: (error: any) => {
        debugger
        console.log('Error fetching detail: ', error);
      }
    });
  }

  placeOrder() {
    debugger;
  
    if (this.orderForm.valid) {
      // Sử dụng toán tử spread (...) để sao chép giá trị từ form vào orderData
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value,
      };
      this.orderData.cart_items = this.cartItems.map((cartItem) => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity,
      }));
      this.orderData.total_money = this.totalAmount;
  
      // Dữ liệu hợp lệ, gửi đơn hàng đi
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response: Order) => {
          debugger;
  
          // Hiển thị thông báo thành công
          Swal.fire({
            title: 'Đặt hàng thành công!',
            text: 'Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ sớm nhất!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            // Xóa giỏ hàng và điều hướng sau khi người dùng nhấn OK
            this.cartService.clearCart();
            this.router.navigate(['/']);
          });
        },
        complete: () => {
          debugger;
          this.calculateTotal();
        },
        error: (error: any) => {
          debugger;
  
          // Hiển thị thông báo lỗi
          Swal.fire({
            title: 'Lỗi khi đặt hàng!',
            text: `Đã xảy ra lỗi trong quá trình đặt hàng: ${error?.error?.message || 'Vui lòng thử lại sau.'}`,
            icon: 'error',
            confirmButtonText: 'Thử lại',
          });
        },
      });
    } else {
      // Hiển thị thông báo dữ liệu không hợp lệ
      Swal.fire({
        title: 'Dữ liệu không hợp lệ!',
        text: 'Vui lòng kiểm tra lại thông tin đơn hàng trước khi đặt.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }

  decreaseQuantity(index: number): void {
    if(this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateCartFromCartItems();
      this.calculateTotal();
    }
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.updateCartFromCartItems();
    this.calculateTotal();
  }
  
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
  
  confirmDelete(index: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.cartItems.splice(index, 1);
      this.updateCartFromCartItems();
      this.calculateTotal();
      debugger
    }
  }

  applyCoupon(): void {

  }

  private updateCartFromCartItems(): void {
    this.cart.clear()
    this.cartItems.forEach((item) => {
      this.cart.set(item.product.id, item.quantity); // Đặt id sản phẩm làm key, số lượng làm value
    });
    this.cartService.setCart(this.cart);
    debugger
  }
}

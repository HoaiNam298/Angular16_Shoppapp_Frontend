import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDTO } from 'src/app/dtos/order.dto';
import { enviroment } from 'src/app/enviroments/enviroment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  orderForm: FormGroup; //đối tượng FormGroup để quản lý dữ liệu form
  cartItems: { product: Product, quantity: number } [] = [];
  totalAmount: number = 0;
  couponcode: string = '';
  orderData: OrderDTO = {
    user_id: 13,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
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
    //Lấy danh sách sản phẩm từ giỏ hàng
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); //Chuyển danh sách Id từ Map giỏ hàng
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
    debugger
    if(this.orderForm.valid) {
      //Sử dụng toán tử spread (...) để sao chép giá trị từ form vào orderData
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));

      //Dữ liệu hợp lệ, bạn có thể gửi đơn hàng đi
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response) => {
          debugger;
          console.log("Đặt hàng thành công");
        },
        complete: () => {
          debugger;
          this.calculateTotal();
        },
        error: (error: any) => {
          debugger;
          console.error("Lỗi khi đặt hàng: ", error);
        }
      });

    } else {
      //Hiển thị thông báo lỗi hoặc xử lý khác
      alert("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!");
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price + item.quantity, 0
    )
  }

  applyCoupon(): void {

  }
}

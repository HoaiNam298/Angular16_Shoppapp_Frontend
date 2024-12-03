import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/dtos/user/login.dto';
import { UserService } from 'src/app/service/user.service';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { TokenService } from 'src/app/service/token.service';
import { RoleService } from 'src/app/service/role.service';
import { Role } from 'src/app/models/role';
import { UserResponse } from 'src/app/responses/user/user.response';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  /* login user
  phoneNumber: string = '1122334455';
  password: string = '123';
  */

  // /* login admin
  phoneNumber: string = '2233445566';
  password: string = '123';
  // */

  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined; //Biến lưu gtri từ dropdown
  userResponse?: UserResponse;

  constructor(
    private userService: UserService, 
    private router: Router,
    private tokenService: TokenService,
    private roleService: RoleService,
    private cartService: CartService
    ) {
  }

  onPhoneNumberChange(){
    console.log(`Phone typed: ${this.phoneNumber}`)
  }

  ngOnInit() {
    debugger
    this.roleService.getRole().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (err: any) => {
        debugger
        console.error('Error getting roles: ', err);
      },
    })
  }
  
  login(){
    const message = `phone: ${this.phoneNumber}` +
                    `password: ${this.password}`;
    // alert(message);
    debugger
    
    const loginDto: LoginDto = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    }
    
    this.userService.login(loginDto).subscribe({
      next: (response: LoginResponse) => {
        //Muốn sử dụng token trong các yêu cầu API
        debugger
        const {token} = response;
        if(this.rememberMe) {
          this.tokenService.setToken(token);
          debugger;
          this.userService.getUserDetails(token).subscribe({
            next:(response: any) => {
              debugger;
              this.userResponse = {
                ...response
              }
              this.userService.saveUserResponseToLocalStorage(this.userResponse);
              if(this.userResponse?.role.name == 'admin') {
                this.router.navigate(['/admin']);
              } else if (this.userResponse?.role.name == 'user') {
                this.router.navigate(['/']);
              }
              Swal.fire({
                title: 'Đăng nhập thành công!',
                text: 'Chào mừng bạn trở lại!',
                icon: 'success',
                confirmButtonText: 'OK',
              });
              
            },
            complete: () => {
              this.cartService.refreshCart();
              debugger;
            },
            error: (error: any) => {
              console.error('Lỗi khi lấy thông tin người dùng: ', error);
              Swal.fire({
                title: 'Đăng nhập thất bại!',
                text: error?.error?.message || 'Không thể lấy thông tin người dùng.',
                icon: 'error',
                confirmButtonText: 'Thử lại',
              });
            },
          })
        }
      },
      complete() {
        debugger
      },
      error: (error: any) => {
        // Xử lý lỗi đăng nhập
        Swal.fire({
          title: 'Đăng nhập thất bại!',
          text: error?.error?.message || 'Thông tin đăng nhập không chính xác.',
          icon: 'error',
          confirmButtonText: 'Thử lại',
        });
      },
    });
  }
}

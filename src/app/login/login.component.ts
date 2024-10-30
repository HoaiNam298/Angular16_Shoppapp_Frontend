import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { LoginDto } from '../dtos/user/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  onPhoneNumberChange(){
    console.log(`Phone typed: ${this.phoneNumber}`)
  }
  
  login(){
    const message = `phone: ${this.phoneNumber}` +
                    `password: ${this.password}`;
    // alert(message);
    debugger
    
    const loginDto: LoginDto = {
      "phone_number": this.phoneNumber,
      "password": this.password
    }
    
    this.userService.login(loginDto).subscribe({
      next: (response: any) => {
        debugger
        //Xử lý kết quả khi trả về đăng nhập thành công
        //Đăng nhập thành công, chuyển sang màn hình home
        this.router.navigate(['/home']);
      },
      complete() {
        debugger
        // alert(`Đăng nhập thành công: ${JSON.stringify(registerDto)}`)
      },
      error(error: any) {
        //Xử lý lỗi nếu có
        alert(`Cannot login, error: ${error.error}`);
        debugger
        console.error('Đăng nhập không thành công: ', error);
      },
    });
  }
}

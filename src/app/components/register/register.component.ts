import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { registerDto } from 'src/app/dtos/user/register.dto';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  dateOfBirth: Date;
  address: string;
  isAccepted: boolean;

  constructor(private userService: UserService, private router: Router){
    this.phoneNumber='';
    this.password='';
    this.retypePassword='';
    this.fullName='';
    this.dateOfBirth=new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    this.address='';
    this.isAccepted=false;
  }
  onPhoneNumberChange(){
    console.log(`Phone typed: ${this.phoneNumber}`)
  }
  
  register(){
    const message = `phone: ${this.phoneNumber}` +
                    `password: ${this.password}` +
                    `retype password: ${this.retypePassword}` +
                    `fullName: ${this.fullName}` +
                    `address: ${this.address}` +
                    `dateOfBirth: ${this.dateOfBirth}` +
                    `isAccepted: ${this.isAccepted}`;
    // alert(message);
    debugger
    
    const registerDto: registerDto = {
      "fullname": this.fullName,
      "phone_number": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }
    
    this.userService.register(registerDto).subscribe({
      next: (response: any) => {
        debugger
        //Xử lý kết quả khi trả về đăng ký thành công
        //Đăng ký thành công, chuyển sang màn hình login
        Swal.fire({
          title: 'Đăng nhập thành công!',
          text: 'Chào mừng bạn trở lại!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.router.navigate(['/login']);
      },
      complete() {
        debugger
      },
      error(error: any) {
        //Xử lý lỗi nếu có
        debugger
        Swal.fire({
          title: 'Đăng nhập thất bại!',
          text: error?.error || 'Đăng ký không thành công',
          icon: 'error',
          confirmButtonText: 'Thử lại',
        });
        debugger
        console.error('Đăng ký không thành công: ', error);
      },
    });
  }
  checkPasswordsMatch(){
    if(this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({'paswordMismatch': true});
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }
  checkAge() {
    if(this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if(age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({'invalidAge': true});
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}

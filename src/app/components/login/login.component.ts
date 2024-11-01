import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/dtos/user/login.dto';
import { UserService } from 'src/app/service/user.service';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { TokenService } from 'src/app/service/token.service';
import { RoleService } from 'src/app/service/role.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '1122334455';
  password: string = '123';

  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined; //Biến lưu gtri từ dropdown

  constructor(
    private userService: UserService, 
    private router: Router,
    private tokenService: TokenService,
    private roleService: RoleService
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
        }
        
        //Xử lý kết quả khi trả về đăng nhập thành công
        //Đăng nhập thành công, chuyển sang màn hình home
        // this.router.navigate(['/home']);
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

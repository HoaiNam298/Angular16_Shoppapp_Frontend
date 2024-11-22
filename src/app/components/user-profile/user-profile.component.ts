import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  userResponse?: UserResponse;
  userProfileForm: FormGroup; //đối tượng FormGroup để quản lý dữ liệu form

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.userProfileForm = this.fb.group({
      fullname: [''],
      address: [''],
      phone_number: ['', [Validators.minLength(6)]],
      password: ['', [Validators.minLength(3)]],
      retype_password: ['', [Validators.minLength(3)]],
      date_of_birth: [''],
    }, {
      validators: this.passwordMatchValidator
    })
  }

  ngOnInit(): void {
    debugger;
    let token = this.tokenService.getToken() ?? '';
    this.userService.getUserDetails(token).subscribe({
      next:(response: any) => {
        debugger;
        this.userResponse = {
          ...response
        };
        this.userProfileForm.patchValue({
          fullname: this.userResponse?.fullname ?? '',
          address: this.userResponse?.address ?? '',
          date_of_birth: this.userResponse?.date_of_birth 
            ? new Date(this.userResponse.date_of_birth).toISOString().substring(0, 10)
            : null,
        })
        this.userService.saveUserResponseToLocalStorage(this.userResponse);
        
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message)
      }
    })
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const retypePassword = formGroup.get('retype_password')?.value;
      if(password != retypePassword) {
        return {pasworMismatch: true};
      }
      return null
    }
  }

  save(): void {
    debugger
    if(this.userProfileForm.valid) {
      const updateUserDTO: UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value,
        address: this.userProfileForm.get('address')?.value,
        password: this.userProfileForm.get('password')?.value,
        retype_password: this.userProfileForm.get('retype_password')?.value,
        date_of_birth: this.userProfileForm.get('date_of_birth')?.value,
      };

      debugger;
      let token = this.tokenService.getToken() ?? '';
      this.userService.updateUserDetail(token, updateUserDTO)
        .subscribe({
          next: (response: any) => {
            debugger;
            this.userService.removeUserFromLocalStorage();
            this.tokenService.removeToken();
            this.router.navigate(['/login']);
          },
          error: (error: any) => {
            alert(error?.error?.message);
          }
        })
    } else {
      if(this.userProfileForm.hasError('pasworMismatch')) {
        alert('Mật khẩu và mật khẩu gõ lại chưa chính xác')
      }
    }
  }

}

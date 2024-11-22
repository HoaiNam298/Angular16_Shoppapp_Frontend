import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminComponent: string = 'orders';
  userResponse?: UserResponse | null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    // this.route.queryParams.subscribe(params => {
    //   this.adminComponent = params['component'] || 'orders'; // 'orders' là mặc định nếu không có tham số
    // });
  }

  logout() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  showAdminComponent(componentName: string): void {
    // this.adminComponent = componentName;
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: { component: componentName },
    //   queryParamsHandling: 'merge', // Giữ lại các query params khác (nếu có)
    // });

    if(componentName == 'orders') {
      this.router.navigate(['/admin/orders'])
    } else if(componentName == 'categories') {
      this.router.navigate(['/admin/categories'])
    } else if(componentName == 'products') {
      this.router.navigate(['/admin/products'])
    }
  }
}

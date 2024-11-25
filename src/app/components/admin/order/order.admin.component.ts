import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from 'src/app/enviroments/enviroment';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/service/order.service';
import { OrderResponse } from 'src/app/responses/order.response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order.admin.component.html',
  styleUrls: ['./order.admin.component.scss']
})
export class OrderAdminComponent implements OnInit {
  orderResponses: OrderResponse[] = [];
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = "";
  visiblePages: number[] = [];
  currentPage: number = 1;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllOrders(this.keyword,  this.currentPage, this.itemsPerPage);
  }

  getAllOrders(keyword: string, page: number, limit: number) {
    this.orderService.getAllOrders(keyword, page - 1, limit).subscribe({
      next: (response: any) => {
        debugger
        this.orderResponses = response.orders;
        this.totalPages = response.total_pages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger;
      },
      error: (error : any) => {
        debugger;
        console.error('Error fetching products', error);
      }
    });
  }

  onPageChange(page: number) {
    debugger
    this.currentPage = page;
    this.getAllOrders(this.keyword,  this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    debugger;
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if(endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  onProductClick(productId: number) {
    debugger
    this.router.navigate(['/products', productId]);
  }

  viewDetails(order: OrderResponse) {
    debugger
    this.router.navigate(['/admin/orders', order.id])
  }

  deleteOrder(id: number) {
    // Hiển thị thông báo xác nhận xóa với SweetAlert2
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Đơn hàng sẽ bị xóa và không thể khôi phục!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
  
        this.orderService.deleteOrder(id).subscribe({
          next: (response: any) => {
            debugger;
  
            // Hiển thị thông báo xóa thành công
            Swal.fire({
              title: 'Xóa thành công!',
              text: 'Đơn hàng đã được xóa.',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              // Điều hướng về trang danh sách đơn hàng sau khi xóa thành công
              this.router.navigate(['/admin/orders']);
            });
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
  
            // Hiển thị thông báo lỗi khi xóa thất bại
            Swal.fire({
              title: 'Lỗi!',
              text: `Đã xảy ra lỗi khi xóa đơn hàng: ${error?.error?.message || 'Vui lòng thử lại sau.'}`,
              icon: 'error',
              confirmButtonText: 'Thử lại',
            });
            console.error('Error deleting order: ', error);
          },
        });
      }
    });
  }
}

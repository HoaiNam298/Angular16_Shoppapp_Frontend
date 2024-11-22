import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from 'src/app/enviroments/enviroment';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product.admin.component.html',
  styleUrls: ['./product.admin.component.scss']
})
export class ProductAdminComponent implements OnInit {

  products: Product[] = [];
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = "";
  visiblePages: number[] = [];
  currentPage: number = 1;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts(this.keyword,  this.currentPage, this.itemsPerPage);
  }

  getAllProducts(keyword: string, page: number, limit: number) {
    this.productService.getAllProducts(keyword, page - 1, limit).subscribe({
      next: (response: any) => {
        debugger
        response.products.forEach((product: Product) => {
          debugger
          product.url = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
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
    this.getAllProducts(this.keyword, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
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

}

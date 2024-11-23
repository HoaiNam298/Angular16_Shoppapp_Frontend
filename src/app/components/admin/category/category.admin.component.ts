import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category.admin.component.html',
  styleUrls: ['./category.admin.component.scss']
})
export class CategoryAdminComponent implements OnInit {

  categories: Category[] = [];
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  currentPage: number = 1;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories(this.currentPage, this.itemsPerPage);
  }

  getAllCategories(page: number, limit: number) {
    this.categoryService.getCategories(page - 1, limit).subscribe({
      next: (response: any) => {
        debugger
        this.categories = response;
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
    this.getAllCategories(this.currentPage, this.itemsPerPage);
  }

}

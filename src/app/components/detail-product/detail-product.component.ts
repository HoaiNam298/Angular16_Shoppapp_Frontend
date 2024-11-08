import { Component, OnInit } from '@angular/core';
import { enviroment } from 'src/app/enviroments/enviroment';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.image';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit{
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit() {
    //Lấy productId từ url
    //const idParam = this.activatedRouter.paramMap.get('id');
    debugger
    const idParam = 5; //fake tạm giá trị
    if(idParam !== null) {
      this.productId = +idParam;
    }
    if(!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          //Lấy danh sách ảnh sản phẩm và thay đổi URL
          debugger
          if(response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {
              debugger
              product_image.imageUrl = `${enviroment.apiBaseUrl}/products/images/${product_image.imageUrl}`;
            });
          }
          debugger
          this.product = response
          //Bắt đầu với ảnh đầu tiên
          this.showImage(0);
        },
        complete: () => {
          debugger
        },
        error: (error: any) => {
          debugger
          console.log('Error fetching detail: ', error);
        }
      });
    } else {
      console.error('Invalid productId: ', idParam);
    }
  }

  showImage(index: number) {
    debugger
    if(this.product && this.product.product_images && this.product.product_images.length > 0) {
      //đảm bảo index nằm trong khoảng hợp lệ
      if(index < 0) {
        index = 0
      } else if (index >= this.product.product_images.length) {
        index = this.product.product_images.length - 1;
      }
      //Gán index hiện tại và cập nhật ảnh hiển thị
      this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number) {
    debugger
    //Gọi khi mội thumbnail được bấm
    this.currentImageIndex = index; //Cập nhật currentImageIndex
  }

  nextImage(): void {
    debugger
    this.showImage(this.currentImageIndex + 1);
  }

  preciousImage(): void {
    debugger
    this.showImage(this.currentImageIndex - 1);
  }

}

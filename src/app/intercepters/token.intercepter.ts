import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable()
export class TokenIntercepter implements HttpInterceptor{

    //phải đăng ký intercepter trong module
    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if(token) {
            //Nhân bản req để sử rồi lấy thằng cũ tham chiếu lại thằng mới để lưu
            //Giống setSate trong ReactJS
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }
        return next.handle(req);
    }
    
}
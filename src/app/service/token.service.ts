import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private jwtHelperService = new JwtHelperService();

    constructor() {}

    //setter, getter
    getToken():string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string):void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    getUserId(): number {
        debugger
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (!token) {
            console.error("Token is null or undefined");
            return 0;
        }
        console.log("Token: ", token)
        let userObject = this.jwtHelperService.decodeToken(token);
        return 'userId' in userObject ? parseInt(userObject['userId']) : 0;
    }

    isTokenExpired(): boolean {
        if(this.getToken() == null) {
            return false;
        }
        return this.jwtHelperService.isTokenExpired(this.getToken());
    }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registerDto } from '../dtos/user/register.dto';
import { LoginDto } from '../dtos/user/login.dto';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrlRegister = `${enviroment.apiBaseUrl}/users/register`;
  private apiUrlLogin = `${enviroment.apiBaseUrl}/users/login`;
  private apiConfig = {
    headers : this.createHeader(),
  }

  constructor(private http: HttpClient) { }

  private createHeader(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  register(registerDto: registerDto): Observable<any> {
    this.createHeader();
    return this.http.post(this.apiUrlRegister, registerDto, this.apiConfig)
  }

  login(loginDto: LoginDto): Observable<any> {
    this.createHeader();
    return this.http.post(this.apiUrlLogin, loginDto, this.apiConfig)
  }
}

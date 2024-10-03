import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registerDto } from '../dtos/register.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = "http://localhost:6969/api/v1/users/register";

  constructor(private http: HttpClient) { }
  register(registerDto: registerDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      //'Access-Control-Allow-Origin' : "*"
    });
    return this.http.post(this.apiUrl, registerDto, {headers: headers})
  }
}

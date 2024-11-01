import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  private apiGetRole = `${enviroment.apiBaseUrl}/roles`;

  constructor(private http: HttpClient) { }

  getRole(): Observable<any> {
    return this.http.get<any[]>(this.apiGetRole)
  }
}

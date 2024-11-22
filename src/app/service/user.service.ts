import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registerDto } from '../dtos/user/register.dto';
import { LoginDto } from '../dtos/user/login.dto';
import { enviroment } from '../enviroments/enviroment';
import { UserResponse } from '../responses/user/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrlRegister = `${enviroment.apiBaseUrl}/users/register`;
  private apiUrlLogin = `${enviroment.apiBaseUrl}/users/login`;
  private apiUserDetails = `${enviroment.apiBaseUrl}/users/details`;
  
  private apiConfig = {
    headers : this.createHeader(),
  }

  constructor(private http: HttpClient) { }

  private createHeader(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi'
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

  getUserDetails(token: string)  {
    return this.http.post(this.apiUserDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  updateUserDetail(token: string, updateUserDTO: UpdateUserDTO) {
    debugger
    let userResponse = this.getUserResponseFromLocalStorage();
    return this.http.put(`${this.apiUserDetails}/${userResponse?.id}`, updateUserDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
      const userResponseJSON = JSON.stringify({
        ...userResponse,
        date_of_birth: userResponse.date_of_birth
          ? new Date(userResponse.date_of_birth).toISOString() // Đảm bảo chuyển đổi thành ISO
          : null, // Nếu `date_of_birth` không hợp lệ, lưu null
      });
      localStorage.setItem('user', userResponseJSON);
      console.log("User saved to local storage")
    } catch (error) {
      console.error('Error saving user response to local storage', error);
    }
  }

  getUserResponseFromLocalStorage(): UserResponse | null {
    try {
      const userResponseJSON = localStorage.getItem('user');

      if(userResponseJSON == null || userResponseJSON==undefined) {
        return null;
      }
      const userResponse = JSON.parse(userResponseJSON!);

      console.log("User response retrieved from local store.")
      return userResponse
    } catch (error) {
      console.error("Error retrieving user from local storage: ", error);
      return null;
    }
  }

  removeUserFromLocalStorage(): void{
    try {
      localStorage.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error("Error removing user data from local storage: ", error);
    }
  }
}

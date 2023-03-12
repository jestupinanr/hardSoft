import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login } from '@core/models/auth/auth.model';
import { User } from '@core/models/user/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_HARDSOFT = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  public login (dataLogin: login): Observable<User> {
    return this.http.post<User>(`${this.API_HARDSOFT}auth/login`, {
      ...dataLogin
    })
  }
}

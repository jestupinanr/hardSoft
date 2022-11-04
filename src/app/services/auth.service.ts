import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login } from '@core/models/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_HARDSOFT = "http://localhost:8090/hardsoft/api/auth"

  constructor(private http: HttpClient) { }

  public async getUserLogin  (dataLogin: login): Promise<any> {
    const data = await this.http.post(`${this.API_HARDSOFT}/login`, {
      dataLogin
    });
    console.log(data);
    
    return data;
  }
}

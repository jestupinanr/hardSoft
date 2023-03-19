import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusResource } from '@core/models/resource/Resource.model';
import { CookieService } from 'ngx-cookie-service';
import { CreateUser, Rol, User } from '@core/models/user/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_HARDSOFT = "http://localhost:3000/"

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public getRoles (): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.API_HARDSOFT}roles`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    } )
  }

  public createUser (createUser: CreateUser): Observable<User> {
    return this.http.post<User>(`${this.API_HARDSOFT}users`, createUser ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  // public createSoftware (createSoftware: CreateSoftware): Observable<Software> {
  //   return this.http.post<Software>(`${this.API_HARDSOFT}resources/software`, createSoftware ,{
  //     headers: {
  //       Authorization: `Bearer ${this.cookieService.get('token')}`
  //     }
  //   })
  // }

  public getAllUsers (): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_HARDSOFT}users` ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    });
  }

  public getOneUserById (id:string): Observable<User> {
    return this.http.get<User>(`${this.API_HARDSOFT}users/${id}`)
  }
}

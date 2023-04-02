import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusResource } from '@core/models/resource/Resource.model';
import { CookieService } from 'ngx-cookie-service';
import { CreateUser, Rol, User } from '@core/models/user/User.model';
import { Assigment } from '@core/models/assigment/Assigments.model';

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

  public editUser (id:string, createUser: CreateUser): Observable<User> {

    const dataUser = {
      ...createUser
    }

    if ( createUser.password === '')
      delete dataUser.password

    return this.http.put<User>(`${this.API_HARDSOFT}users/${id}`, dataUser,
    {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

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

  public getAssigmentByUser (id:string): Observable<Assigment[]> {
    return this.http.get<Assigment[]>(`${this.API_HARDSOFT}assigment/user/${id}`,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    });
  }
}

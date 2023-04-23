import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusResource } from '@core/models/resource/Resource.model';
import { CookieService } from 'ngx-cookie-service';
import { CreateUser, Rol, User } from '@core/models/user/User.model';
import { Assigment } from '@core/models/assigment/Assigments.model';
import * as moment from 'moment';
import { reportForm } from '@core/models/report';

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

  public uploadPhotoUser (formPhoto: FormData): Observable<{ route: string }> {
    return this.http.post<{ route: string }>(`${this.API_HARDSOFT}upload/imagen`, formPhoto ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public getReportExcel (value: reportForm) {
    this.http.get(`${this.API_HARDSOFT}users/report/persons?dateStart=${moment(value.dateStart).format('YYYY-MM-DD')}&dateEnd=${moment(value.dateEnd).format('YYYY-MM-DD')}`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      },
      observe: 'response', responseType: 'blob' as 'json'
    }).subscribe((res) => {
      // Parse data to file
      const file = new Blob([res.body as BlobPart]);

      // Create file url
      const url = URL.createObjectURL(file);

      // Create name excel
      const date = new Date();
      let dateToday = '';

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (month < 10)
        dateToday = `${day}-0${month}-${year}`;
      else
        dateToday = `${day}-${month}-${year}`;
      // Create an anchor and set the URL
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = `${dateToday}.xlsx`;

      // Add anchor to the DOM
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        URL.revokeObjectURL(link.href);
        if (link.parentNode) link.parentNode.removeChild(link);
      }, 0);
    }, (error) => {
      console.log(error);
    });
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

  public getUsersQueries (query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_HARDSOFT}users?filter=${query}` ,{
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

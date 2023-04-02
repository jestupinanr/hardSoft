import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateHardware, CreateSoftware, Hardware, Resources, Software, StatusResource } from '@core/models/resource/Resource.model';
import { CookieService } from 'ngx-cookie-service';
import { Assigment, createrAssigment } from '@core/models/assigment/Assigments.model';

@Injectable({
  providedIn: 'root'
})
export class AssigmentService {

  private API_HARDSOFT = "http://localhost:3000/"

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // public getStatus (): Observable<StatusResource[]> {
  //   return this.http.get<StatusResource[]>(`${this.API_HARDSOFT}resources/status`, {
  //     headers: {
  //       Authorization: `Bearer ${this.cookieService.get('token')}`
  //     }
  //   } )
  // }

  public createAssigment (createAssigment: createrAssigment): Observable<Assigment> {
    return this.http.post<Assigment>(`${this.API_HARDSOFT}assigment`, createAssigment ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public editAssigment (id: string, createAssigment: createrAssigment): Observable<Assigment> {
    return this.http.put<Assigment>(`${this.API_HARDSOFT}assigment/${id}`, createAssigment ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public getAllAssigments (): Observable<Assigment[]> {
    return this.http.get<Assigment[]>(`${this.API_HARDSOFT}assigment` ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    });
  }

  public getOneAssigmentById (id:string): Observable<Assigment> {
    return this.http.get<Assigment>(`${this.API_HARDSOFT}assigment/${id}`,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }
}

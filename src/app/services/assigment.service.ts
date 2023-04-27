import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateHardware, CreateSoftware, Hardware, Resources, Software, StatusResource } from '@core/models/resource/Resource.model';
import { CookieService } from 'ngx-cookie-service';
import { Assigment, createrAssigment } from '@core/models/assigment/Assigments.model';
import * as moment from 'moment';
import { reportForm } from '@core/models/report';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class AssigmentService {

  private API_HARDSOFT = "http://localhost:3000/"

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private resourceService: ResourceService
    ) { }

  // public getStatus (): Observable<StatusResource[]> {
  //   return this.http.get<StatusResource[]>(`${this.API_HARDSOFT}resources/status`, {
  //     headers: {
  //       Authorization: `Bearer ${this.cookieService.get('token')}`
  //     }
  //   } )
  // }

  public createAssigment (createAssigment: createrAssigment): Observable<Assigment> {
    this.resourceService.changeResourceStatus(createAssigment.resource, 1);
    const copyCreateAssigment = {...createAssigment}
    if (copyCreateAssigment.returnDate === "")
      delete copyCreateAssigment.returnDate
    return this.http.post<Assigment>(`${this.API_HARDSOFT}assigment`, copyCreateAssigment ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public editAssigment (id: string, createAssigment: createrAssigment): Observable<Assigment> {
    console.log('entre x2');
    console.log(createAssigment);

    if (createAssigment.hasOwnProperty('returnDate')) {
      console.log('engtre');
      const a = this.resourceService.changeResourceStatus(createAssigment.resource, 0).subscribe(
        (res) => {
          console.log(res);
          return this.http.put<Assigment>(`${this.API_HARDSOFT}assigment/${id}`, createAssigment ,{
            headers: {
              Authorization: `Bearer ${this.cookieService.get('token')}`
            }
          })
        }
      );
    }
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
  };

  public getReportExcel (value: reportForm) {
    this.http.get(`${this.API_HARDSOFT}assigment/report/assigment?dateStart=${moment(value.dateStart).format('YYYY-MM-DD')}&dateEnd=${moment(value.dateEnd).format('YYYY-MM-DD')}`, {
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
}

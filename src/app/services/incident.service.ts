import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Assigment, createrAssigment } from '@core/models/assigment/Assigments.model';
import { CreateIncident, incident, statusIncident } from '@core/models/incident/Incident.model';
import * as moment from 'moment';
import { reportForm } from '@core/models/report';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private API_HARDSOFT = "http://localhost:3000/"

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public getStatus (): Observable<statusIncident[]> {
    return this.http.get<statusIncident[]>(`${this.API_HARDSOFT}incidents/status`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    } )
  }

  public createIncident (createIncident: CreateIncident): Observable<incident> {
    const dataIncident = {
      ...createIncident
    }

    if ( createIncident.solution === null)
      delete dataIncident.solution

    return this.http.post<incident>(`${this.API_HARDSOFT}incidents`, dataIncident,
    {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public editIncident (id: string, createIncident: CreateIncident): Observable<incident> {
    const dataIncident = {
      ...createIncident
    }

    if ( createIncident.solution === null)
      delete dataIncident.solution

    return this.http.put<incident>(`${this.API_HARDSOFT}incidents/${id}`, dataIncident,
    {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public getAllIncidents (): Observable<incident[]> {
    return this.http.get<incident[]>(`${this.API_HARDSOFT}incidents` ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    });
  }

  public getOneIncidentById (id:string): Observable<incident> {
    return this.http.get<incident>(`${this.API_HARDSOFT}incidents/${id}`)
  };

  public getReportExcel (value: reportForm) {
    this.http.get(`${this.API_HARDSOFT}incidents/report/incident?dateStart=${moment(value.dateStart).format('YYYY-MM-DD')}&dateEnd=${moment(value.dateEnd).format('YYYY-MM-DD')}`, {
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

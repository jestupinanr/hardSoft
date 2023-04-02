import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Assigment, createrAssigment } from '@core/models/assigment/Assigments.model';
import { CreateIncident, incident, statusIncident } from '@core/models/incident/Incident.model';

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
  }
}

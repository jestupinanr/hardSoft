import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusResource } from '@core/models/resource/Resource.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private API_HARDSOFT = "http://localhost:3000/"

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public getStatus (): Observable<StatusResource[]> {
    return this.http.get<StatusResource[]>(`${this.API_HARDSOFT}resources/status`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    } )
  }
}

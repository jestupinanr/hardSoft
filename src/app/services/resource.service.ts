import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandsResource, CreateHardware, CreateSoftware, Hardware, Resources, Software, StatusResource, TypesResource } from '@core/models/resource/Resource.model';
import { CookieService } from 'ngx-cookie-service';
import { User } from '@core/models/user/User.model';
import { Assigment } from '@core/models/assigment/Assigments.model';

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

  public getBrandsHardware (): Observable<BrandsResource[]> {
    return this.http.get<StatusResource[]>(`${this.API_HARDSOFT}resources/brand?resource=hardware`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    } )
  }

  public getTypesHardware(): Observable<TypesResource[]> {
    return this.http.get<TypesResource[]>(`${this.API_HARDSOFT}resources/type?resource=hardware`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    } )
  }

  public getBrandsSoftware (): Observable<BrandsResource[]> {
    return this.http.get<StatusResource[]>(`${this.API_HARDSOFT}resources/brand?resource=software`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    } )
  }

  public getTypesSoftware(): Observable<TypesResource[]> {
    return this.http.get<TypesResource[]>(`${this.API_HARDSOFT}resources/type?resource=software`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    } )
  }

  public createHardware (createHardware: CreateHardware): Observable<Resources> {
    return this.http.post<Resources>(`${this.API_HARDSOFT}resources/hardware`, createHardware ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public editardware (id: string, createHardware: CreateHardware): Observable<Hardware> {
    return this.http.put<Hardware>(`${this.API_HARDSOFT}resources/hardware/${id}`, createHardware ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public createSoftware (createSoftware: CreateSoftware): Observable<Resources> {
    return this.http.post<Resources>(`${this.API_HARDSOFT}resources/software`, createSoftware ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public editSoftware (id: string, createSoftware: CreateSoftware): Observable<Software> {
    return this.http.put<Software>(`${this.API_HARDSOFT}resources/software/${id}`, createSoftware ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public getAllResources (): Observable<Resources[]> {
    return this.http.get<Resources[]>(`${this.API_HARDSOFT}resources` ,{
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    });
  }

  public getOneResourceById (id:string): Observable<Resources> {
    return this.http.get<Resources>(`${this.API_HARDSOFT}resources/get-one/${id}`)
  }

  public getAssigmentByIdResource (id:string): Observable<Assigment> {
    return this.http.get<Assigment>(`${this.API_HARDSOFT}assigment/resource/${id}`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public createbrandHardware (name: string): Observable<BrandsResource> {
    return this.http.post<Software>(`${this.API_HARDSOFT}resources/brand`, {
      name,
      resource: 'hardware'
    }, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public createTypeHardware (name: string): Observable<TypesResource> {
    return this.http.post<Software>(`${this.API_HARDSOFT}resources/type`, {
      name,
      resource: 'hardware'
    }, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public createbrandSoftware (name: string): Observable<BrandsResource> {
    return this.http.post<Software>(`${this.API_HARDSOFT}resources/brand`, {
      name,
      resource: 'software'
    }, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }

  public createTypeSoftware (name: string): Observable<TypesResource> {
    return this.http.post<Software>(`${this.API_HARDSOFT}resources/type`, {
      name,
      resource: 'software'
    }, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      }
    })
  }
}

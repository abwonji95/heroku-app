
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, of } from 'rxjs';
import { LOCATION } from '../interfaces/location'
import { Router } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://127.0.0.1:8000/api/location/'

  constructor(public http: HttpClient, private router: Router) { }

  getLocation(): Observable<LOCATION[]> {

    return this.http.get<LOCATION[]>(this.apiUrl);
  }

  deleteLocation(location: LOCATION): Observable<LOCATION> {

    const url = `${this.apiUrl}${location.id}/`;
    return this.http.delete<LOCATION>(url);
  }
  updateLocation(data: any, id: number) {

    return this.http.put<any>(this.apiUrl + id + '/', data).pipe(map((res: any) => {
      return res;
    }))
  }
  createLocation(data: any) {

    return this.http.post<any>(this.apiUrl, data).pipe(map((res: any) => {
      return res;
    }))
  }

}

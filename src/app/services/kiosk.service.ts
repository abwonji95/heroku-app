
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, of } from 'rxjs';
import { KIOSK } from '../interfaces/kiosk'
import { Router } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class KioskService {
  private apiUrl = 'http://127.0.0.1:8000/api/kiosk/'

  constructor(public http: HttpClient, private router: Router) { }

  get(): Observable<KIOSK[]> {

    return this.http.get<KIOSK[]>(this.apiUrl);
  }

  delete(kiosk: KIOSK): Observable<KIOSK> {

    const url = `${this.apiUrl}${kiosk.id}/`;
    return this.http.delete<KIOSK>(url);
  }
  update(data: any, id: number) {

    return this.http.put<any>(this.apiUrl + id + '/', data).pipe(map((res: any) => {
      return res;
    }))
  }
  create(data: any) {

    return this.http.post<any>(this.apiUrl, data).pipe(map((res: any) => {
      return res;
    }))
  }

}

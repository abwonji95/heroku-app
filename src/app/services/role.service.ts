
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, of } from 'rxjs';
import { ROLE } from '../interfaces/role'
import { Router } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://127.0.0.1:8000/api/role/'

  constructor(public http: HttpClient, private router: Router) { }

  get(): Observable<ROLE[]> {

    return this.http.get<ROLE[]>(this.apiUrl);
  }

  delete(role: ROLE): Observable<ROLE> {

    const url = `${this.apiUrl}${role.id}/`;
    return this.http.delete<ROLE>(url);
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

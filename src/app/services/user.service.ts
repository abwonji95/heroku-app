
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, of } from 'rxjs';
import { USER } from '../interfaces/users'
import { Router } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/user/'

  constructor(public http: HttpClient, private router: Router) { }

  get(): Observable<USER[]> {

    return this.http.get<USER[]>(this.apiUrl);
  }

  delete(user: USER): Observable<USER> {

    const url = `${this.apiUrl}${user.id}/`;
    return this.http.delete<USER>(url);
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

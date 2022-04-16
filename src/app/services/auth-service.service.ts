import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient, public router: Router) {}

  login(loginPayload: any) {

    var splitted = loginPayload.split("&");
    let payMod =  splitted[0]+"&"+`password=${encodeURIComponent(splitted[1].split("=")[1])}`+"&"+splitted[2]+"&"+splitted[3]+"&"+splitted[4]+"&"+splitted[5];
    //console.log("loginPayload  " + payMod);
    return this.currentloginid(payMod);
  }

  async currentloginid(payMod: any) {
    //changes this url by your realms
    try {
      const response = await fetch('http://localhost:8080', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: payMod
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Request failed', error);
    }
  }

  user(): string {
    const payload = this.getDataToken(this.token);
    /**
     * changes
     * username -> normal configuration
     * user_name -> customer configuration
     * preferred_username -> common on ldap
     * */
    return payload.preferred_username;
  }

  public get token(): string {

    let resul:any;

    if (sessionStorage.getItem('token') != null) {
      resul= sessionStorage.getItem('token');
      resul= localStorage.getItem('token');
    }
    console.log(resul)
    localStorage.setItem(resul,'token');
    return resul;
  }

  saveToken(accessToken: string): void {
    localStorage.setItem('token', accessToken);
  }

  getDataToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.getDataToken(this.token);

    /**
     * changes
     * username -> normal configuration
     * user_name -> customer configuration
     * preferred_username -> common on ldap
     * */

    if (payload != null && payload.preferred_username && payload.preferred_username.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.clear();
  }
}

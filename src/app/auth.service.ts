import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: number | null = null;

  constructor(private http: HttpClient) {
    this.token = this.getCookie('session')
  }
  
  login() {
    return this.http.get('http://mrapi.mathis-lenoir.net/?action=isLogged&token=' + this.token)
  }

  private getCookie(name: string) {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;

      for (let i: number = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) == 0) {
              return Number(c.substring(cookieName.length, c.length));
          }
      }
      return 0;
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://mrapi.mathis-lenoir.net/?action=login', { username: username, password: password })
  }

  register(username: string, email: string, password: string, password2: string) {
    return this.http.post('http://mrapi.mathis-lenoir.net/?action=register', { username: username, email: email, password: password, confirm_password: password2 })
  }

  isLogged(token: number) {
    return this.http.get('http://mrapi.mathis-lenoir.net/?action=isLogged&token=' + token)
  }
}

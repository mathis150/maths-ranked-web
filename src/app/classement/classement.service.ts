import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ClassementService {
  constructor(private http: HttpClient) {}

  getClassement() {
    return this.http.get('http://mrapi.mathis-lenoir.net/?action=getClassement')
  }
}

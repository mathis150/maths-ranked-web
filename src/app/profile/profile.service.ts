import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}

  updateProfile(userId: number, pseudonyme: string, description: string) {
    return this.http.post('http://mrapi.mathis-lenoir.net/?action=updateProfile', { id: userId, pseudonyme: pseudonyme, description: description })
  }
}

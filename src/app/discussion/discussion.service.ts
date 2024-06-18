import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DiscussionService {
  constructor(private http: HttpClient) {}

  sendMessage(userId: number, message: string) {
    return this.http.post('http://mrapi.mathis-lenoir.net/?action=sendMessage', { id: userId, message: message })
  }

  getMessages() {
    return this.http.get('http://mrapi.mathis-lenoir.net/?action=getMessages')
  }

  deleteMessage(id: number) {
    return this.http.post('http://mrapi.mathis-lenoir.net/?action=deleteMessage&id=' + id, {})
  }
}

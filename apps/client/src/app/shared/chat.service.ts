import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '@wolfchat/client-env';
import { Api } from './api';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  api: Api = new Api(environment.apiUrl);

  constructor(private http: HttpClient) { }

  getChats() {
    return this.http.get(this.api.chats);
  }
}

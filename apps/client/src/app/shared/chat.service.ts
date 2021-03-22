import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { publishLast, refCount } from 'rxjs/operators';

import { environment } from '@wolfchat/client-env';
import { Api } from './api';
import { LatLng } from 'leaflet';
import { userStorageKey } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private api: Api = new Api(environment.apiUrl);

  constructor(private http: HttpClient) { }

  getChats() {
    return this.http.get(this.api.chats);
  }

  addChat(coords: LatLng) {
    const call = this.http.post(this.api.chats, {lat: coords.lat, lng: coords.lng}).pipe(publishLast(), refCount());
    call.subscribe(response => { });
    return call;
  }

  getMessages(chatId) {
    return this.http.get(this.api.messages(chatId));
  }

  addMessage(chatId, content: string) {
    const author = localStorage.getItem(userStorageKey);
    const payload = { author: author, content: content}
    const call = this.http.post(this.api.messages(chatId), payload).pipe(publishLast(), refCount());
    call.subscribe(response => { });
    return call;
  }
}

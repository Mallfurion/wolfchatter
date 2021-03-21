import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '@wolfchat/client-env';
import { Api } from './api';
import { LatLng } from 'leaflet';

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
    this.http.post(this.api.chats, {lat: coords.lat, lng: coords.lng}).subscribe(response => { });
  }
}

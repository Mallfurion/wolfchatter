import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ChatService } from '../shared/chat.service';
import { Chat } from '../shared/models/chat';

@Component({
  selector: 'wolfchatter-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;
  private markers: L.Marker[] = [];

  constructor(private chatService: ChatService) {}

  ngAfterViewInit() {
    this.initMap();
    this.initChatMarkers();

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.addMarker(event.latlng);
    })
  }

  private initMap() {
    this.map = L.map('map', {
      center: [46.7712, 23.6236],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    tiles.addTo(this.map);
  }

  private initChatMarkers() {
    this.chatService.getChats().subscribe((chats: Chat[]) => {
      chats.forEach(c => this.addMarker(new L.LatLng(c.lat, c.lng)));
    })
  }

  addMarker(coords: L.LatLng) {
    const marker = L.marker(coords).addTo(this.map);
    marker.on('click', this.handleMarkerClick, this);
    this.markers.push(marker);

    this.chatService.addChat(coords);
  }

  handleMarkerClick(event: L.LeafletMouseEvent) {
    this.markers.forEach((m: any) => m._icon.classList.remove('active-marker'));
    event.target._icon.classList.add('active-marker');
  }
}

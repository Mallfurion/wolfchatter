import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ChatService } from '../shared/chat.service';
import { Chat } from '../shared/models/chat';
import { SocketService } from '../shared/socket.service';

@Component({
  selector: 'wolfchatter-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;
  private markers: L.Marker[] = [];
  selectedMarker: number = null;

  constructor(private chatService: ChatService, private socketService: SocketService) {}

  ngAfterViewInit() {
    this.initMap();
    this.initChatMarkers();

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.chatService.addChat(event.latlng).subscribe(res => {
        this.addMarker(event.latlng, res.id);
      });
    });

    this.socketService.getChatNotifications().subscribe(c => {
      this.addMarker(new L.LatLng(c.lat, c.lng), c.id);
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
      chats.forEach(c => this.addMarker(new L.LatLng(c.lat, c.lng), c.id));
    })
  }

  addMarker(coords: L.LatLng, id) {
    const marker = new L.Marker(coords, <any>{id: id}).addTo(this.map);
    marker.on('click', this.handleMarkerClick, this);
    this.markers.push(marker);
  }

  handleMarkerClick(event: L.LeafletMouseEvent) {
    this.markers.forEach((m: any) => m._icon.classList.remove('active-marker'));
    event.target._icon.classList.add('active-marker');
    this.selectedMarker = event.target.options.id;
  }
}

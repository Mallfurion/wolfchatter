import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ChatService } from './shared/chat.service';
import { ChatComponent } from './chat/chat.component';
import { SocketService } from './shared/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    ChatService,
    SocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

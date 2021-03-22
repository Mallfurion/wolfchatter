import { Component, OnInit } from '@angular/core';
import { userStorageKey } from './shared/constants';

@Component({
  selector: 'wolfchatter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  askForUser = false;
  
  ngOnInit() {
    const userName = localStorage.getItem(userStorageKey);
    if (!userName) {
      this.askForUser = true;
    }
  }

  setName(name) {
    localStorage.setItem(userStorageKey, name);
    this.askForUser = false;
  }
}

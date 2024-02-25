import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  isHasSound: boolean = true;
  sound: string = 'volume-high-outline';
  openCloseSound() {
    if (this.isHasSound) {
      this.isHasSound = false;
      this.sound = 'volume-high-outline';
    } else {
      this.isHasSound = true;
      this.sound = 'volume-mute-outline';
    }
  }

  constructor() {}
}

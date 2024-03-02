import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor() { }
  async ionViewDidEnter() {
    try {
      await ScreenOrientation.lock({  orientation: 'portrait'})
    } catch (error) {
      alert(error)    }
  }
  
}

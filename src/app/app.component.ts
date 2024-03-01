import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // add this
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.setDefaultLang('gb');

    localStorage.setItem('bleDeviceId', `Device1`);
    localStorage.setItem(
      'data',
      `$DATA_,1,408.2,2,20,6,10342.65,6524,12687,9765,11372,8976,70.5,1800.25,1,1,1,1,1,1,0,0,0,0,0,0,19.5,19.5,19.5,19.5,19.5,19.5,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1500,90,3500,675,*76,0x0D,0x0A`
    );
    localStorage.setItem(
      'settings',
      `$SETTING_,1.5,100,45,50000,6,60,1,1,1,1,1,1,1,0,0,0,0,0,0,4,1,1,1,1,1,54,8,65,200,200,200,200,200,200,1000,200,50000,200,200,200,200,200,60,*76`
    );
  }
}

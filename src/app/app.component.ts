import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // add this
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {}

  initializeApp() {
    // other stuff...
    this.translate.setDefaultLang('en'); // add this
  }
}

import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-picker',
  // template: `<ion-select (ionChange)="changeLanguage($event.target.value)>
  // <ion-option value="tr">Türkçe</ion-option>
  // <ion-option value="en">English</ion-option>
  // </ion-select>`
  template: `<ion-button
    shape="round"
    ion-button
    color="light"
    (click)="changeLanguage()"
  >
    <ion-icon slot="icon-only" class="fi fi-{{ language }} fis"></ion-icon>
  </ion-button>`,
})
export class LanguagePickerComponent {
  language: string | null;
  constructor(
    private translate: TranslateService,
    private actSheet: ActionSheetController
  ) {
    if (!localStorage.getItem('user-language')) {
      localStorage.setItem('user-language', 'gb');
    }
    this.language = localStorage.getItem('user-language');
    this.translate.use(this.language);
  }

  async changeLanguage() {
    const actionSheet = await this.actSheet.create({
      header: this.translate.get('choose-language')[0],
      buttons: [
        {
          text: 'Türkçe',
          handler: () => {
            this.language = 'tr';
            localStorage.setItem('user-language', this.language);
            this.translate.use(this.language);
          },
        },
        {
          text: 'English',
          handler: () => {
            this.language = 'gb';
            localStorage.setItem('user-language', this.language);
            this.translate.use(this.language);
          },
        },
      ],
    });
    await actionSheet.present();
  }
}

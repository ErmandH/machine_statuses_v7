import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsTab3Page } from '../settings-tab3/settings-tab3.page';
import { IonTabs, ModalController } from '@ionic/angular';
import { FertilizerPasswordModalComponent } from '../components/fertilizer-password-modal/fertilizer-password-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  disableTab2: boolean = false;

  constructor(private modalCtrl: ModalController, private router: Router) {}

  async openPasswordModal() {
    const modal = await this.modalCtrl.create({
      component: FertilizerPasswordModalComponent,
    });
    modal.present();
  }

  onTabChange() {
    const url = this.router.url;
    if (url === '/tabs/settings-tab2') {
      this.disableTab2 = true;
    } else {
      this.disableTab2 = false;
    }
  }
}

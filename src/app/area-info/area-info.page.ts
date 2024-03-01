import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MachineStatus } from 'src/models/MachineStatus';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';

@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.page.html',
  styleUrls: ['./area-info.page.scss'],
})
export class AreaInfoPage {

  machineStatus: MachineStatus
  constructor(public alertCtrl: AlertController, public translate: TranslateService) {
    this.machineStatus = loadMachineStatuses()
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('area-info.title'),
      message:this.translate.instant('area-info.message'),
      cssClass:'area-reset-alert',
      buttons: [
        {
          text:this.translate.instant('area-info.ok'),
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

}

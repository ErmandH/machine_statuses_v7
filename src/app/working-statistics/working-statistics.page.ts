import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MachineStatus } from 'src/models/MachineStatus';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';

@Component({
  selector: 'app-working-statistics',
  templateUrl: './working-statistics.page.html',
  styleUrls: ['./working-statistics.page.scss'],
})
export class WorkingStatisticsPage  {

  machineStatus: MachineStatus
  constructor(public alertCtrl: AlertController, public translate: TranslateService) {
    this.machineStatus = loadMachineStatuses()
  }



  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('working-statistics.title'),
      subHeader: this.translate.instant('working-statistics.message'),
      cssClass:'area-reset-alert',
      buttons: [
        {
          text:this.translate.instant('ok'),
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

}

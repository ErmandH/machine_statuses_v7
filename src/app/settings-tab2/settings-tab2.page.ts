import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MachineSettings } from 'src/models/MachineSettings';
import { MachineStatus } from 'src/models/MachineStatus';
import loadMachineSettings from 'src/utils/loadMachineSettings';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';
import { SettingsGeneralFertilizerComponent } from '../components/settings-general-fertilizer/settings-general-fertilizer.component';

@Component({
  selector: 'app-settings-tab2',
  templateUrl: './settings-tab2.page.html',
  styleUrls: ['./settings-tab2.page.scss'],
})
export class SettingsTab2Page implements AfterViewInit, OnInit {

  machineStatus: MachineStatus
  machineSettings: MachineSettings;
  @ViewChild(SettingsGeneralFertilizerComponent) settingsFertilizer : SettingsGeneralFertilizerComponent;
  isGeneralSaveButtonDisabled = false;
  isFertilizerSaveButtonDisabled = false;
  
  constructor(public alertCtrl: AlertController, public translate: TranslateService) {


  }
  ngOnInit(): void {
    this.machineSettings = loadMachineSettings()
    this.machineStatus = loadMachineStatuses()
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('settings.general-fertilizer.title'),
      subHeader: this.translate.instant('settings.general-fertilizer.message'),
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

  ngAfterViewInit(){
    this.settingsFertilizer.isButtonDisabled().subscribe(value => {
      this.isFertilizerSaveButtonDisabled = value;
    })
  }
  submitFertilizerSettings(){
    this.settingsFertilizer.onFormSubmit()
  }

}

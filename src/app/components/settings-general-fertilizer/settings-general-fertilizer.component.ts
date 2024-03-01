import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MachineSettings } from 'src/models/MachineSettings';
import loadMachineSettings from 'src/utils/loadMachineSettings';

@Component({
  selector: 'app-settings-general-fertilizer',
  templateUrl: './settings-general-fertilizer.component.html',
  styleUrls: ['./settings-general-fertilizer.component.scss'],
})
export class SettingsGeneralFertilizerComponent  implements OnInit {

  machineSettings: MachineSettings;
  info: FormGroup;
  constructor(private alertService: AlertController, private translate: TranslateService) {
    this.machineSettings = loadMachineSettings()
  }
  ngOnInit(){
    this.info = new FormGroup({
      fertilizerStartTorque: new FormControl(
        this.machineSettings.fertilizerStartTorque,
        [Validators.min(0), Validators.max(1000), Validators.required]
      ),
      fertilizerCalibrationRPM: new FormControl(this.machineSettings.fertilizerCalibrationRPM, [
        Validators.min(0),
        Validators.max(1000),
        Validators.required,
      ]),
      fertilizerCalibrationTour: new FormControl(
        this.machineSettings.fertilizerCalibrationTour,
        [Validators.min(0), Validators.max(1000), Validators.required]
      ),
      multiplier: new FormControl(
        this.machineSettings.multiplier,
        [Validators.min(0), Validators.max(80000), Validators.required]
      ),
      engineSignalOnATour: new FormControl(this.machineSettings.engineSignalOnATour, [
        Validators.min(0),
        Validators.max(1000),
        Validators.required,
      ]),
      unitSeedOfArea: new FormControl(this.machineSettings.unitSeedOfArea, [
        Validators.pattern("^[0-9]*$"),
        Validators.min(0),
        Validators.max(1000),
        Validators.required,
      ]),
      distanceRPM1: new FormControl(this.machineSettings.distanceRPM1, [
        Validators.min(0),
        Validators.max(1000),
        Validators.required,
      ]),
      distanceRPM2: new FormControl(this.machineSettings.distanceRPM2, [
        Validators.min(0),
        Validators.max(1000),
        Validators.required,
      ]),
      distanceRPM3: new FormControl(this.machineSettings.distanceRPM3, [
        Validators.min(0),
        Validators.max(1000),
        Validators.required,
      ]),
      engineStep1: new FormControl(this.machineSettings.engineStep1, [
        Validators.min(0),
        Validators.max(1000),
        Validators.required,
      ]),
      engineStep2: new FormControl(this.machineSettings.engineStep2, [
        Validators.min(0),
        Validators.max(1000),
        Validators.required,
      ]),
      engineStep3: new FormControl(this.machineSettings.engineStep3, [
        Validators.min(0),
        Validators.max(1000),
        Validators.required,
      ]),
    });
  }

  async onFormSubmit() {
    const dataArray = localStorage.getItem('settings').split(',')
    const afterMotorsIndex = 25;
    dataArray[afterMotorsIndex] = this.info.get('unitSeedOfArea').value
    dataArray[afterMotorsIndex + 10] = this.info.get('multiplier').value
    dataArray[afterMotorsIndex + 11] = this.info.get('engineSignalOnATour').value
    dataArray[afterMotorsIndex + 13] = this.info.get('fertilizerStartTorque').value
    dataArray[afterMotorsIndex + 14] = this.info.get('fertilizerCalibrationRPM').value
    dataArray[afterMotorsIndex + 15] = this.info.get('fertilizerCalibrationTour').value

    dataArray[afterMotorsIndex + 4] = this.info.get('distanceRPM1').value
    dataArray[afterMotorsIndex + 5] = this.info.get('engineStep1').value
    dataArray[afterMotorsIndex + 6] = this.info.get('distanceRPM2').value
    dataArray[afterMotorsIndex + 7] = this.info.get('engineStep2').value
    dataArray[afterMotorsIndex + 8] = this.info.get('distanceRPM3').value
    dataArray[afterMotorsIndex + 9] = this.info.get('engineStep3').value

    // array to string
    const settingsString = dataArray.join(',')
    localStorage.setItem('settings', settingsString)
    // create success alert
    const alert = await this.alertService.create({
      header: this.translate.instant('success'),
      message: this.translate.instant('changes-saved'),
      buttons: [this.translate.instant('ok')]
    })
    await alert.present()
  }

  isButtonDisabled(): Observable<boolean> {
    return new Observable(observer => {
      this.info.valueChanges.subscribe(() => {
        // isButtonDisabled değeri her seferinde güncellenir
        const isDisabled = this.info.invalid
        observer.next(isDisabled);
      });
    });
  }

}

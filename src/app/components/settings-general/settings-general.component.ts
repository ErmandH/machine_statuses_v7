import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { textToDataView } from '@capacitor-community/bluetooth-le';
import { AlertController, IonInput, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BleUserService } from 'src/app/services/bleuser.service';
import { MachineSettings } from 'src/models/MachineSettings';
import loadMachineSettings from 'src/utils/loadMachineSettings';

@Component({
  selector: 'app-settings-general',
  templateUrl: './settings-general.component.html',
  styleUrls: ['./settings-general.component.scss'],
})
export class SettingsGeneralComponent implements OnInit {
  @Input() focusDistanceBetweenSeeds: boolean;
  @Input() focusFertilizerWeight: boolean;
  @Input() focusDistanceBetweenUnits: boolean;
  machineSettings: MachineSettings;
  @ViewChild('distanceBetweenSeedsInput') seedInput: IonInput;
  @ViewChild('fertilizerWeightInput') fertilizerWeightInput: IonInput;
  @ViewChild('distanceBetweenUnitInput') distanceBetweenUnitInput: IonInput;
  info: FormGroup;
  constructor(
    private alertService: AlertController,
    private toastr: ToastController,
    private translate: TranslateService,
    private bleService: BleUserService
  ) {
    this.machineSettings = loadMachineSettings();
  }
  async onFormSubmit() {
    const dataArray = localStorage.getItem('settings').split(',');
    const afterUnitIndex = 20;
    dataArray[1] = this.info.get('seedControlPeriod').value;
    dataArray[2] = this.info.get('discHoleNumber').value;
    dataArray[3] = this.info.get('distanceBetweenSeeds').value;
    dataArray[4] = this.info.get('fertilizerWeight').value;
    dataArray[5] = this.info.get('numberOfUnit').value;
    dataArray[6] = this.info.get('distanceBetweenUnit').value;
    dataArray[afterUnitIndex + 6] = this.info.get('wheelDiameter').value;
    dataArray[afterUnitIndex + 7] = this.info.get('numberOfSignals').value;
    dataArray[afterUnitIndex + 8] = this.info.get('tolerance').value;
    // array to string
    const settingsString = dataArray.join(',');
    localStorage.setItem('settings', settingsString);
    await this.bleService.write(textToDataView(settingsString));
    // create success alert
    const alert = await this.alertService.create({
      header: this.translate.instant('success'),
      message: this.translate.instant('changes-saved'),
      buttons: [this.translate.instant('ok')],
    });

    await alert.present();
  }

  ngOnInit() {
    this.info = new FormGroup({
      discHoleNumber: new FormControl(this.machineSettings.discHoleNumber, [
        Validators.pattern('^[0-9]*$'),
        Validators.min(0),
        Validators.max(100),
        Validators.required,
      ]),
      distanceBetweenSeeds: new FormControl(
        this.machineSettings.distanceBetweenSeeds.toString(),
        [Validators.min(4), Validators.max(90), Validators.required]
      ),
      numberOfUnit: new FormControl(this.machineSettings.numberOfUnit, [
        Validators.pattern('^[0-9]*$'),
        Validators.min(2),
        Validators.max(12),
        Validators.required,
      ]),
      distanceBetweenUnit: new FormControl(
        this.machineSettings.distanceBetweenUnits,
        [Validators.min(45), Validators.max(90), Validators.required]
      ),
      fertilizerWeight: new FormControl(
        this.machineSettings.targetFertilizerWeight,
        [Validators.min(5000), Validators.max(80000), Validators.required]
      ),
      tolerance: new FormControl(this.machineSettings.tolerance, [
        Validators.min(0.01),
        Validators.max(99.9),
        Validators.required,
      ]),
      wheelDiameter: new FormControl(this.machineSettings.wheelDiameter, [
        Validators.min(35),
        Validators.max(120),
        Validators.required,
      ]),
      numberOfSignals: new FormControl(this.machineSettings.numberOfSignals, [
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(10),
        Validators.required,
      ]),
      seedControlPeriod: new FormControl(this.machineSettings.period, [
        Validators.required,
      ]),
    });

    if (this.focusDistanceBetweenSeeds === true) {
      setTimeout(() => this.seedInput.setFocus(), 500);
    }
    if (this.focusFertilizerWeight === true) {
      setTimeout(() => this.fertilizerWeightInput.setFocus(), 500);
    }
    if (this.focusDistanceBetweenUnits === true) {
      setTimeout(() => this.distanceBetweenUnitInput.setFocus(), 500);
    }
  }

  isButtonDisabled(): Observable<boolean> {
    return new Observable((observer) => {
      this.info.valueChanges.subscribe(() => {
        // isButtonDisabled değeri her seferinde güncellenir
        const isDisabled = this.info.invalid;
        //console.log(isDisabled)
        observer.next(isDisabled);
      });
    });
  }

  clickOnFocus = (id: string) => document.getElementById(id).click();
}

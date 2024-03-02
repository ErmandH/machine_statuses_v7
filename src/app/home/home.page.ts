import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { MachineSettings } from 'src/models/MachineSettings';
import { MachineStatus } from 'src/models/MachineStatus';
import isMotorsDisabled from 'src/utils/isMotorsDisabled';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';
import { HomeButtonsPopoverComponent } from '../components/home-buttons-popover/home-buttons-popover.component';
import loadMachineSettings from 'src/utils/loadMachineSettings';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  speed: string = '0';
  isHasSound: boolean = true;
  configString = '$CONN_ ,1,1,6,6,2,1,5,1,0,0,1,2,*76,0x0D,0x0A';
  sound: string = 'volume-high-outline';
  machineSettings: MachineSettings = null;
  machineStatus: MachineStatus = null;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
  ) {}

  async ionViewDidEnter() {
    try {
      await ScreenOrientation.lock({  orientation: 'landscape'})
    } catch (error) {
      
    }
  }
  ionViewWillEnter() {
    if (isMotorsDisabled()) {
      this.alertCtrl
        .create({
          header: 'WARNING!',
          message: 'One or more motors are disabled',
          buttons: ['OK'],
        })
        .then(async (alert) => await alert.present());
    }
    this.machineStatus = loadMachineStatuses();
    this.machineSettings = loadMachineSettings();
  }

  ngOnInit() {
    this.machineStatus = loadMachineStatuses();
    this.machineSettings = loadMachineSettings();
  }

  openCloseSound() {
    if (this.isHasSound) {
      this.isHasSound = false;
      this.sound = 'volume-high-outline';
    } else {
      this.isHasSound = true;
      this.sound = 'volume-mute-outline';
    }
  }

  async presentPopover(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: HomeButtonsPopoverComponent,
      componentProps: {
        sound: this.sound,
        openCloseSound: this.openCloseSound,
      },
      event: myEvent,
    });

    await popover.present();
  }

  goToRowEnableDisable = () => this.router.navigate(['/tabs/settings-tab3']);

  goToDistanceBetweenSeeds = () =>
    this.router.navigate(['/tabs/settings-tab1'], {
      state: { focusInput: 'distanceBetweenSeedsInput' },
    });

  goToDistanceBetweenUnits = () =>
    this.router.navigate(['/tabs/settings-tab1'], {
      state: { focusInput: 'distanceBetweenUnitsInput' },
    });

  goToFertilizerWeight = () =>
    this.router.navigate(['/tabs/settings-tab1'], {
      state: { focusInput: 'fertilizerWeightInput' },
    });
}

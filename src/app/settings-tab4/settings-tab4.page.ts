import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Motor } from 'src/models/MachineSettings';
import loadMachineSettings from 'src/utils/loadMachineSettings';

@Component({
  selector: 'app-settings-tab4',
  templateUrl: './settings-tab4.page.html',
  styleUrls: ['./settings-tab4.page.scss'],
})
export class SettingsTab4Page {

  constructor(private router: Router) { }
  
  onToggleChange(event: any, motor:Motor,motorIndex: number) {
    const settingsData = localStorage.getItem('settings').split(',')
    settingsData[21 + motorIndex] = event.detail.checked ? '1' : '0'
    const settingsString = settingsData.join(',')
    localStorage.setItem('settings', settingsString)
    motor.enabled = event.detail.checked
  }

  loadSettings = () => loadMachineSettings()

  openCalibrationModal = () => {
    this.router.navigate(['/fertilizer-calibration'], {
      queryParams: { returnUrl: this.router.url },
    });
  };
  openSeedCalibrationModal = () => {
    this.router.navigate(['/seed-calibration'], {
      queryParams: { returnUrl: this.router.url },
    });
  };
}

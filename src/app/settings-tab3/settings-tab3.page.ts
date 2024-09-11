import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MachineSettings } from 'src/models/MachineSettings';
import { MachineStatus, Machines } from 'src/models/MachineStatus';
import loadMachineSettings from 'src/utils/loadMachineSettings';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';
import { BleUserService } from '../services/bleuser.service';
import { textToDataView } from '@capacitor-community/bluetooth-le';
import { DataService } from '../services/dataservice.service';

@Component({
  selector: 'app-settings-tab3',
  templateUrl: './settings-tab3.page.html',
  styleUrls: ['./settings-tab3.page.scss'],
})
export class SettingsTab3Page implements OnInit {
  machineStatus: MachineStatus;
  machineSettings: MachineSettings;
  constructor(private router: Router, private bleService: BleUserService, private data: DataService) {

  }

  ngOnInit(): void {
    this.loadSettings();
  }

  async onToggleChange(event: any, machine: Machines, machineIndex: number) {
    const settingsData = localStorage.getItem('settings').split(',');
    settingsData[8 + machineIndex] = event.detail.checked ? '1' : '0';
    const settingsString = settingsData.join(',');
    localStorage.setItem('settings', settingsString);
    this.data.changeMachineSettings()
    await this.bleService.write(textToDataView(settingsString));
    machine.show = event.detail.checked;
  }

  loadSettings() {
    this.data.machineStatus.subscribe(status => this.machineStatus = status);
    this.data.machineSettings.subscribe(settings => this.machineSettings = settings);
    return this.machineStatus
  }

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

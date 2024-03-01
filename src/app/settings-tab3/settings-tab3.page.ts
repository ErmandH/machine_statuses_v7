import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MachineSettings } from 'src/models/MachineSettings';
import { MachineStatus, Machines } from 'src/models/MachineStatus';
import loadMachineSettings from 'src/utils/loadMachineSettings';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';

@Component({
  selector: 'app-settings-tab3',
  templateUrl: './settings-tab3.page.html',
  styleUrls: ['./settings-tab3.page.scss'],
})
export class SettingsTab3Page implements OnInit {
  machineStatus: MachineStatus;
  machineSettings: MachineSettings;
  constructor(private router: Router) {}


  ngOnInit(): void {
    this.loadSettings()
  }

  onToggleChange(event: any, machine: Machines, machineIndex: number) {
    const settingsData = localStorage.getItem('settings').split(',');
    settingsData[8 + machineIndex] = event.checked ? '1' : '0';
    const settingsString = settingsData.join(',');
    localStorage.setItem('settings', settingsString);
    machine.show = event.checked;
  }

  loadSettings(){
    this.machineSettings = loadMachineSettings();
    this.machineStatus = loadMachineStatuses();
    
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

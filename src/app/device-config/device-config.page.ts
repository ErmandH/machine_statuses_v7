import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BleUserService } from '../services/bleuser.service';
import { dataViewToText } from '@capacitor-community/bluetooth-le';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.page.html',
  styleUrls: ['./device-config.page.scss'],
})
export class DeviceConfigPage implements OnInit {
  connReceieved = false;
  dataReceived = false;
  settingsReceived = false;
  constructor(
    private bleService: BleUserService,
    private router: Router,
    private change: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.bleService.startNotifications((value) =>
      this.processConfigs(dataViewToText(value))
    );
  }

  processConfigs(data: string) {
    console.log(data);
    let dataArray = data.split(',');
    if (dataArray[0] == '$DATA_') {
      localStorage.setItem('data', data);
      this.dataReceived = true;
      alert('$DATA received');
    } else if (dataArray[0] == '$CONN_') {
      localStorage.setItem('conn', data);
      this.connReceieved = true;
      alert('$CONN received');
    } else if (dataArray[0] == '$SETTING_') {
      localStorage.setItem('settings', data);
      this.settingsReceived = true;
      alert('$SETTING received');
    }
    this.change.detectChanges();
    if (this.connReceieved && this.dataReceived && this.settingsReceived) {
      this.router.navigateByUrl('/');
    }
  }

  async goBack() {
    await this.bleService.disconnect();
    this.router.navigateByUrl('/device-select');
  }
}

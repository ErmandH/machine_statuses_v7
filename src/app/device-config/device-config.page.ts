import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BleUserService } from '../services/bleuser.service';
import { dataViewToText } from '@capacitor-community/bluetooth-le';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';
import { Router } from '@angular/router';
import { DataService } from '../services/dataservice.service';

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
    private change: ChangeDetectorRef,
    private data: DataService
  ) { }

  async ngOnInit() {
    await this.bleService.startNotifications((value) =>
      this.processConfigs(dataViewToText(value))
    );
  }
  reloadPage() {
    this.data.changeMachineStatus()
    this.data.changeMachineSettings()
  }
  processConfigs(data: string) {
    try {
      let dataArray = data.split(',');
      if (dataArray[0] == '$DATA_') {
        if (dataArray.length < 55) {
          throw new Error(`Missing data: DATA is not of expected length.\nReceived data: ${data}`)
        }
        localStorage.setItem('data', data);
        const currentUrl = this.router.url;
        if (currentUrl == '/device-config') {
          this.dataReceived = true;
          this.data.changeMachineStatus()
        }
        else {
          this.reloadPage() //
        }
      }

      else if (dataArray[0] == '$CONN_') {
        if (dataArray.length < 13) {
          throw new Error(`Missing data: CONN is not of expected length.\nReceived data: ${data}`)
        }
        localStorage.setItem('conn', data);
        const currentUrl = this.router.url;
        if (currentUrl == '/device-config') {
          this.connReceieved = true;
        }
        else {
          this.reloadPage()
        }
      }

      else if (dataArray[0] == '$SETTING_') {
        if (dataArray.length < 44) {
          throw new Error(`Missing data: SETTING is not of expected length.\nReceived data: ${data}`)
        }
        localStorage.setItem('settings', data);
        const currentUrl = this.router.url;
        if (currentUrl == '/device-config') {
          this.settingsReceived = true;
          this.data.changeMachineSettings()
        }
        else {
          this.reloadPage()
        }
      }
      this.change.detectChanges();
      if (this.connReceieved && this.dataReceived && this.settingsReceived) {
        this.router.navigateByUrl('/');
      }
    } catch (error: any) {
      alert(error)
    }

  }



  async goBack() {
    await this.bleService.disconnect();
    this.router.navigateByUrl('/device-select');
  }
}

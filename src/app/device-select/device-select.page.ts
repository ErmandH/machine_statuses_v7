import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BleClient,
  BluetoothLe,
  dataViewToText,
  textToDataView,
} from '@capacitor-community/bluetooth-le';
import { AlertController, AlertOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BleUserService } from '../services/bleuser.service';
import { CHARACTERISTIC_UUID, SERVICE_UUID } from 'src/constans/constants';

type Device = {
  id: string;
  name: string;
  unitNumber: number;
  data: string;
  settings: string;
};

@Component({
  selector: 'app-device-select',
  templateUrl: './device-select.page.html',
  styleUrls: ['./device-select.page.scss'],
})
export class DeviceSelectPage implements OnInit {
  devices: any[] = [];
  ble: boolean = false;
  scanText: string = '';
  isScanning: boolean = false;
  constructor(
    private router: Router,
    private change: ChangeDetectorRef,
    private alertController: AlertController,
    private translate: TranslateService,
    private bleService: BleUserService
  ) {
    console.log('scan page open');
    // this.devices = [
    //   {
    //     id: 'Device1',
    //     name: 'Device1',
    //     data: `$DATA_,1,408.2,2,20,6,10342.65,6524,12687,9765,11372,8976,70.5,1800.25,1,1,1,1,1,1,0,0,0,0,0,0,19.5,19.5,19.5,19.5,19.5,19.5,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1500,90,3500,675,*76,0x0D,0x0A`,
    //     settings: `$SETTING_,1.5,100,45,50000,6,60,1,1,1,1,1,1,1,0,0,0,0,0,0,4,1,1,1,1,1,54,8,65,200,200,200,200,200,200,1000,200,50000,200,200,200,200,200,60,*76`,
    //   },
    //   {
    //     id: 'Device2',
    //     name: 'Device2',
    //     data: `$DATA_,1.5,816.4,2,18,6,10342.65,6524,12687,9765,11372,8976,70.5,1600,1,1,1,1,1,1,0,0,0,0,0,0,19.5,19.5,19.5,19.5,19.5,19.5,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1500,90,3500,675,*77,0x0D,0x0A`,
    //     settings: `$SETTING_,1.5,100,45,50000,8,60,1,1,1,1,1,1,1,0,0,0,0,0,0,4,1,1,1,1,1,54,8,65,200,200,200,200,200,200,1000,200,50000,200,200,200,200,200,60,*76`,
    //   },
    //   {
    //     id: 'Device3',
    //     name: 'Device3',
    //     data: `$DATA_,2,1224.6,2,18,6,10342.65,6524,12687,9765,11372,8976,70.5,1560,1,1,1,1,1,1,0,0,0,0,0,0,19.5,19.5,19.5,19.5,19.5,19.5,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1500,90,3500,675,*78,0x0D,0x0A`,
    //     settings: `$SETTING_,1.5,100,45,50000,12,60,1,1,1,1,1,1,1,0,0,0,0,0,0,4,1,1,1,1,1,54,8,65,200,200,200,200,200,200,1000,200,50000,200,200,200,200,200,60,*76`,
    //   },
    // ];
    //this.scanForDevices();
  }

  async ngOnInit() {
    BleClient.initialize().then(() => {
      BleClient.isEnabled().then(async (enabled) => {
        this.ble = enabled;
        const devices = await BleClient.getConnectedDevices([SERVICE_UUID]);
        this.devices = devices.map((device) => ({
          ...device,
          connection: true,
        }));
        // if (!enabled) {
        //   await BleClient.requestEnable();
        // }
      });
    });
  }
  selectDevice(device: Device) {
    localStorage.setItem('bleDeviceId', device.id);
    localStorage.setItem('data', device.data);
    localStorage.setItem('settings', device.settings);
    console.log('device selected', device.name);
    this.router.navigate(['/']);
  }

  isDeviceExist() {
    if (localStorage.getItem('bleDeviceId')) return true;
    return false;
  }

  toggleBle(event) {
    if (this.ble) {
      this.enableBluetooth();
    } else {
      this.disableBluetooth();
    }
  }

  enableBluetooth() {
    BleClient.enable();
    //BleClient.requestEnable();
  }

  disableBluetooth() {
    BleClient.disable();
  }

  async startScanning() {
    const devices = await BleClient.getConnectedDevices([SERVICE_UUID]);
    this.devices = devices.map((device) => ({ ...device, connection: true }));
    this.scanText = 'Scanning...';
    BleClient.requestLEScan({ allowDuplicates: false }, (result) => {
      if (result.localName) {
        this.devices.push(result.device);
        this.change.detectChanges();
      }
    });
    setTimeout(() => this.stopScanning(), 7000);
  }

  stopScanning(): void {
    BluetoothLe.stopLEScan().then(() => {
      this.scanText = '';
    });
  }

  async connect(device, index) {
    const deviceId = device.deviceId;

    try {
      // connect to device
      await BleClient.connect(deviceId, (deviceId) => {
        // cihaz disconnect oldugunda ne yapsin
      });
      await this.showAlert({
        header: this.translate.instant('success'),
        message: `${this.translate.instant('connected')} ${device.name}`,
        buttons: [
          {
            text: this.translate.instant('ok'),
            handler: () => {
              // cihaza baglanildiginda ne yapsin
            },
          },
        ],
      });
      this.devices[index]['connection'] = true;
      localStorage.setItem('bleDeviceId', deviceId);
      this.change.detectChanges();
      await this.bleService.startNotifications((value) =>
        alert(dataViewToText(value))
      );
    } catch (error) {
      await this.showAlert({
        header: this.translate.instant('error'),
        message: error,
        buttons: [
          {
            text: this.translate.instant('ok'),
            handler: () => {},
          },
        ],
      });
    }
  }

  disconnect(device, index) {
    BleClient.disconnect(device.deviceId).then(async () => {
      await this.showAlert({
        header: this.translate.instant('disconnected'),
        message: `${this.translate.instant('disconnect-message')} ${
          device.name
        }`,
        buttons: [
          {
            text: this.translate.instant('ok'),
            handler: () => {
              // disconnect edildikten sonra
            },
          },
        ],
      });
      this.devices[index]['connection'] = false;
      this.change.detectChanges();
    });
  }

  async showAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
    await alert.present();
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BleClient, BluetoothLe } from '@capacitor-community/bluetooth-le';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController
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
  ngOnInit() {
    BleClient.initialize().then(() => {
      BleClient.isEnabled().then((enabled) => {
        this.ble = enabled;
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
  scanForDevices() {
    this.devices = []; // Clear the existing devices list

    // this.ble.scan([], 5).subscribe(
    //   device => {
    //     this.devices.push(device);
    //   },
    //   error => {
    //     console.error('Error scanning for BLE devices', error);
    //   }
    // );
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
  }

  disableBluetooth() {
    BleClient.disable();
  }

  async startScanning() {
    this.devices = []
    this.scanText = 'Scanning...';
    

    BleClient.requestLEScan({ allowDuplicates: false }, (result) => {
      if (result.localName) {
        this.devices.push(result);
        this.change.detectChanges();
      }
    });
    setTimeout(() => this.stopScanning(), 7000);
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Scanning',
      message: `BLE: ${this.ble ? 'enabled' : 'disabled'}`,
      buttons: ['Action'],
    });

    await alert.present();
  }

  stopScanning(): void {
    BluetoothLe.stopLEScan().then(() => {
      this.scanText = '';
    });
  }

  connect(device, index) {
    BleClient.connect(device.device.deviceId).then(
      () => {
        this.devices[index]['connection'] = true;
        this.change.detectChanges();
        alert('Connected!');
      },
      (error) => {
        alert(error);
      }
    );
  }

  disconnect(device, index) {
    BleClient.disconnect(device.device.deviceId).then(() => {
      this.devices[index]['connection'] = false;
      this.change.detectChanges();
      alert('Disconnected!');
    });
  }
}

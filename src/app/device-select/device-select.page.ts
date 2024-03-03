import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BleClient,
  BluetoothLe,
  dataViewToText,
  hexStringToDataView,
  numberToUUID,
  numbersToDataView,
  textToDataView,
} from '@capacitor-community/bluetooth-le';
import { AlertController } from '@ionic/angular';

type Device = {
  id: string;
  name: string;
  unitNumber: number;
  data: string;
  settings: string;
};

const SERVICE_UUID = '49535343-fe7d-4ae5-8fa9-9fafd205e455';
const CHARACTERISTIC_UUID = '49535343-1e4d-4bd9-ba61-23c647249616';
const dataToSend = 'AT+VER\r\n'; // RN4870 için bir AT komutu

const BATTERY_SERVICE = numberToUUID(0x180f);
const BATTERY_CHARACTERISTIC = numberToUUID(0x2a19);

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
    this.devices = [];
    this.scanText = 'Scanning...';

    BleClient.requestLEScan({ allowDuplicates: false }, (result) => {
      if (result.localName) {
        this.devices.push(result);
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

  connect(device, index) {
    const deviceId = device.device.deviceId;
    BleClient.connect(deviceId).then(
      async () => {
        this.devices[index]['connection'] = true;
        this.change.detectChanges();
        //alert(`Connected to ${JSON.stringify(device)}!`);

        // try {
        //   await BleClient.write(
        //     device.deviceId,
        //     SERVICE_UUID,
        //     CHARACTERISTIC_UUID,
        //     hexStringToDataView('746573746d6573616a69')
        //   );
        // } catch (error) {
        //   alert('discover service failed: ' + error)
        // }

        try {
          await BleClient.discoverServices(deviceId);
          const services = await BleClient.getServices(deviceId);
          const filteredServices = services.filter((service) => {
            // Servisin characteristics dizisinde write özelliği true olanı kontrol et
            return service.characteristics.some(
              (characteristic) =>
                characteristic.properties.write === true ||
                characteristic.properties.writeWithoutResponse === true
            );
          });
          const filteredCharacteristics =
            filteredServices[0].characteristics.filter((characteristic) => {
              return (
                characteristic.properties.write === true ||
                characteristic.properties.writeWithoutResponse
              );
            });
          const str = filteredCharacteristics.map(
            (characteristic) => `${JSON.stringify(characteristic)}\n\n\n`
          );
          //alert(`${str}`)

          await BleClient.startNotifications(
            deviceId,
            SERVICE_UUID,
            CHARACTERISTIC_UUID,
            (value) => {
              alert(`value = ${dataViewToText(value)}`);
            }
          );

          setInterval(async () => {
            await BleClient.write(
              deviceId,
              SERVICE_UUID,
              CHARACTERISTIC_UUID,
              textToDataView('test mesaji')
            );
          }, 4000);

          // alert(
          //   `yollanan characteristik = ${filteredCharacteristics[1].uuid}\n karakteristikler = ${str}`
          // );
        } catch (error) {
          alert('discover service failed: ' + error);
        }
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

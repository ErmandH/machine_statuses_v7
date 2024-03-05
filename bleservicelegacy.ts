// import { ChangeDetectorRef, Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import {
//   BleClient,
//   BleDevice,
//   BluetoothLe,
//   ScanResult,
//   dataViewToText,
//   textToDataView,
// } from '@capacitor-community/bluetooth-le';
// import { AlertController, AlertOptions } from '@ionic/angular';
// import { TranslateService } from '@ngx-translate/core';

// const SERVICE_UUID = '49535343-fe7d-4ae5-8fa9-9fafd205e455';
// const CHARACTERISTIC_UUID = '49535343-1e4d-4bd9-ba61-23c647249616';

// @Injectable({
//   providedIn: 'root',
// })
// export class BleUserService {
//   constructor(
//     private router: Router,
//     private alertController: AlertController,
//     private translate: TranslateService
//   ) {}

//   enableBluetooth() {
//     BleClient.enable();
//   }

//   disableBluetooth() {
//     BleClient.disable();
//   }

//   async startScanning(
//     devices: ScanResult[],
//     scanText: string,
//     change: ChangeDetectorRef
//   ) {
//     devices = [];
//     scanText = 'Scanning...';

//     BleClient.requestLEScan({ allowDuplicates: false }, (result) => {
//       if (result.localName) {
//         devices.push(result);
//         change.detectChanges();
//       }
//     });
//     setTimeout(() => this.stopScanning(scanText), 7000);
//   }

//   private stopScanning(scanText: string): void {
//     BluetoothLe.stopLEScan().then(() => {
//       scanText = '';
//     });
//   }

//   private async discoverServices(deviceId: string) {
//     await BleClient.discoverServices(deviceId);
//   }

//   async connect(
//     devices: ScanResult[],
//     device: ScanResult,
//     index,
//     change: ChangeDetectorRef,
//     onDisconnect?: (deviceId: string) => void
//   ) {
//     const deviceId = device.device.deviceId;

//     try {
//       // connect to device
//       await BleClient.connect(deviceId, onDisconnect);
//       devices[index]['connection'] = true;
//       change.detectChanges();
//       await this.showAlert({
//         header: this.translate.instant('error'),
//         message: `${this.translate.instant('connected')} ${device.localName}`,
//         buttons: [
//           {
//             text: this.translate.instant('ok'),
//             handler: () => {
//               // cihaza baglanildiginda ne yapsin
//             },
//           },
//         ],
//       });
//     } catch (error) {
//       await this.showAlert({
//         header: this.translate.instant('error'),
//         message: error,
//         buttons: [
//           {
//             text: this.translate.instant('ok'),
//             handler: () => {},
//           },
//         ],
//       });
//     }
//     // BleClient.connect(deviceId).then(
//     //   async () => {
//     //     devices[index]['connection'] = true;
//     //     this.change.detectChanges();
//     //     try {
//     //       await BleClient.discoverServices(deviceId);
//     //       const services = await BleClient.getServices(deviceId);
//     //       const filteredServices = services.filter((service) => {
//     //         // Servisin characteristics dizisinde write özelliği true olanı kontrol et
//     //         return service.characteristics.some(
//     //           (characteristic) =>
//     //             characteristic.properties.write === true ||
//     //             characteristic.properties.writeWithoutResponse === true
//     //         );
//     //       });
//     //       const filteredCharacteristics =
//     //         filteredServices[0].characteristics.filter((characteristic) => {
//     //           return (
//     //             characteristic.properties.write === true ||
//     //             characteristic.properties.writeWithoutResponse
//     //           );
//     //         });
//     //       const str = filteredCharacteristics.map(
//     //         (characteristic) => `${JSON.stringify(characteristic)}\n\n\n`
//     //       );
//     //       //alert(`${str}`)

//     //       await BleClient.startNotifications(
//     //         deviceId,
//     //         SERVICE_UUID,
//     //         CHARACTERISTIC_UUID,
//     //         (value) => {
//     //           alert(`value = ${dataViewToText(value)}`);
//     //         }
//     //       );

//     //       setInterval(async () => {
//     //         await BleClient.write(
//     //           deviceId,
//     //           SERVICE_UUID,
//     //           CHARACTERISTIC_UUID,
//     //           textToDataView('test mesaji')
//     //         );
//     //       }, 4000);
//     //     } catch (error) {
//     //       alert('discover service failed: ' + error);
//     //     }
//     //   },
//     //   (error) => {
//     //     alert(error);
//     //   }
//     // );
//   }

//   async showAlert(opts: AlertOptions) {
//     const alert = await this.alertController.create(opts);
//     await alert.present();
//   }

//   async startNotifications(
//     deviceId: string,
//     callback: (value: DataView) => void
//   ) {
//     await BleClient.startNotifications(
//       deviceId,
//       SERVICE_UUID,
//       CHARACTERISTIC_UUID,
//       callback
//     );
//   }

//   async write(deviceId: string, value: DataView) {
//     await BleClient.write(deviceId, SERVICE_UUID, CHARACTERISTIC_UUID, value);
//   }

//   disconnect(
//     devices: ScanResult[],
//     device: ScanResult,
//     index,
//     change: ChangeDetectorRef
//   ) {
//     BleClient.disconnect(device.device.deviceId).then(async () => {
//       devices[index]['connection'] = false;
//       change.detectChanges();
//       await this.showAlert({
//         header: this.translate.instant('disconnected'),
//         message: `${this.translate.instant('disconnect-message')} ${
//           device.localName
//         }`,
//         buttons: [
//           {
//             text: this.translate.instant('ok'),
//             handler: () => {
//               // disconnect edildikten sonra
//             },
//           },
//         ],
//       });
//     });
//   }
// }

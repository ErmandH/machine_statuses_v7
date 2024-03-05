import { Injectable } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { CHARACTERISTIC_UUID, SERVICE_UUID } from 'src/constans/constants';

@Injectable({
  providedIn: 'root',
})
export class BleUserService {
  constructor() {}

  async write(value: DataView) {
    const deviceId: string = localStorage.getItem('bleDeviceId');
    await BleClient.write(deviceId, SERVICE_UUID, CHARACTERISTIC_UUID, value);
  }

  async startNotifications(callback: (value: DataView) => void) {
    const deviceId: string = localStorage.getItem('bleDeviceId');
    await BleClient.startNotifications(
      deviceId,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      callback
    );
  }
}

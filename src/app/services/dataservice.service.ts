import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MachineSettings } from 'src/models/MachineSettings';
import { MachineStatus } from 'src/models/MachineStatus';
import loadMachineSettings from 'src/utils/loadMachineSettings';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private behMachineSettings = new BehaviorSubject<MachineSettings>(this.getLocalSettings());
  private behMachineStatus = new BehaviorSubject<MachineStatus>(this.getLocalStatus());

  machineSettings = this.behMachineSettings.asObservable();
  machineStatus = this.behMachineStatus.asObservable();
  constructor() { }

  changeMachineSettings() {
    this.behMachineSettings.next(loadMachineSettings())
  }

  changeMachineStatus() {
    this.behMachineStatus.next(loadMachineStatuses())
  }

  getLocalStatus() {
    const data = localStorage.getItem('data')
    return data ? loadMachineStatuses() : null
  }

  getLocalSettings() {
    const data = localStorage.getItem('settings')
    return data ? loadMachineSettings() : null
  }
}

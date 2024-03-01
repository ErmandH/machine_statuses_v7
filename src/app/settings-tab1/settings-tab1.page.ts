import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MachineSettings } from 'src/models/MachineSettings';
import { MachineStatus } from 'src/models/MachineStatus';
import loadMachineSettings from 'src/utils/loadMachineSettings';
import { loadMachineStatuses } from 'src/utils/loadMachineStatus';
import { SettingsGeneralComponent } from '../components/settings-general/settings-general.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings-tab1',
  templateUrl: './settings-tab1.page.html',
  styleUrls: ['./settings-tab1.page.scss'],
})
export class SettingsTab1Page implements AfterViewInit, OnInit {
  focusDistanceBetweenSeeds: boolean = false;
  focusFertilizerWeight: boolean = false;
  focusDistanceBetweenUnits: boolean = false;
  machineStatus: MachineStatus;
  machineSettings: MachineSettings;
  @ViewChild(SettingsGeneralComponent)
  settingsGeneralComponent: SettingsGeneralComponent;
  isButtonDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.machineSettings = loadMachineSettings();
    this.machineStatus = loadMachineStatuses();
    this.route.paramMap.subscribe((params) => {
      const focusInput = window.history.state.focusInput; // Gönderilen veri burada alınır
      if (focusInput === 'distanceBetweenSeedsInput') {
        this.focusDistanceBetweenSeeds = true;
      }
      if (focusInput === 'distanceBetweenUnitsInput') {
        this.focusDistanceBetweenUnits = true;
      }
      if (focusInput === 'fertilizerWeightInput') {
        this.focusFertilizerWeight = true;
      }
    });
  }

  submitGeneralSettings() {
    this.settingsGeneralComponent.onFormSubmit();
  }

  ngAfterViewInit() {
    this.settingsGeneralComponent.isButtonDisabled().subscribe((value) => {
      this.isButtonDisabled = value;
    });
    this.cdr.markForCheck()
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

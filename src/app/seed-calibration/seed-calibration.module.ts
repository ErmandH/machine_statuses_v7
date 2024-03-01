import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeedCalibrationPageRoutingModule } from './seed-calibration-routing.module';

import { SeedCalibrationPage } from './seed-calibration.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeedCalibrationPageRoutingModule,
    TranslateModule
  ],
  declarations: [SeedCalibrationPage]
})
export class SeedCalibrationPageModule {}

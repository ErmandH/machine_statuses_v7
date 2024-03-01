import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FertilizerCalibrationPageRoutingModule } from './fertilizer-calibration-routing.module';

import { FertilizerCalibrationPage } from './fertilizer-calibration.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FertilizerCalibrationPageRoutingModule,
    TranslateModule
  ],
  declarations: [FertilizerCalibrationPage]
})
export class FertilizerCalibrationPageModule {}

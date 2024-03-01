import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FertilizerCalibrationPage } from './fertilizer-calibration.page';

const routes: Routes = [
  {
    path: '',
    component: FertilizerCalibrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FertilizerCalibrationPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeedCalibrationPage } from './seed-calibration.page';

const routes: Routes = [
  {
    path: '',
    component: SeedCalibrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeedCalibrationPageRoutingModule {}

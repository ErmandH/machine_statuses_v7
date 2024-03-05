import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceConfigPage } from './device-config.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceConfigPageRoutingModule {}

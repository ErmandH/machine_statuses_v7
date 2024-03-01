import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsTab2Page } from './settings-tab2.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsTab2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsTab2PageRoutingModule {}

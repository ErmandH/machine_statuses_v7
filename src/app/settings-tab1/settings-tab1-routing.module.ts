import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsTab1Page } from './settings-tab1.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsTab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsTab1PageRoutingModule {}

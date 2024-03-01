import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsTab4Page } from './settings-tab4.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsTab4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsTab4PageRoutingModule {}

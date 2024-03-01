import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsTab3Page } from './settings-tab3.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsTab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsTab3PageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaInfoPage } from './area-info.page';

const routes: Routes = [
  {
    path: '',
    component: AreaInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaInfoPageRoutingModule {}

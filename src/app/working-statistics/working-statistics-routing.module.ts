import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkingStatisticsPage } from './working-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: WorkingStatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkingStatisticsPageRoutingModule {}

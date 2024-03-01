import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkingStatisticsPageRoutingModule } from './working-statistics-routing.module';

import { WorkingStatisticsPage } from './working-statistics.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkingStatisticsPageRoutingModule,
    TranslateModule
  ],
  declarations: [WorkingStatisticsPage]
})
export class WorkingStatisticsPageModule {}

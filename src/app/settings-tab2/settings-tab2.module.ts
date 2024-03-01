import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsTab2PageRoutingModule } from './settings-tab2-routing.module';

import { SettingsTab2Page } from './settings-tab2.page';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsGeneralFertilizerModule } from '../components/settings-general-fertilizer/settings-general-fertilizer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsTab2PageRoutingModule,
    TranslateModule,
    SettingsGeneralFertilizerModule
  ],
  declarations: [SettingsTab2Page]
})
export class SettingsTab2PageModule {}

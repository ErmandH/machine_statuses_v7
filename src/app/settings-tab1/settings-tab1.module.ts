import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsTab1PageRoutingModule } from './settings-tab1-routing.module';

import { SettingsTab1Page } from './settings-tab1.page';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsGeneralModule } from '../components/settings-general/settings-general.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsTab1PageRoutingModule,
    TranslateModule,
    SettingsGeneralModule
  ],
  declarations: [SettingsTab1Page]
})
export class SettingsTab1PageModule {}

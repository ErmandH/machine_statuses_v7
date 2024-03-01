import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsTab4PageRoutingModule } from './settings-tab4-routing.module';

import { SettingsTab4Page } from './settings-tab4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsTab4PageRoutingModule
  ],
  declarations: [SettingsTab4Page]
})
export class SettingsTab4PageModule {}

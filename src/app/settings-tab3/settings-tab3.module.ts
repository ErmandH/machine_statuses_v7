import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsTab3PageRoutingModule } from './settings-tab3-routing.module';

import { SettingsTab3Page } from './settings-tab3.page';
import { TranslateModule } from '@ngx-translate/core';
import { BleUserService } from '../services/bleuser.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsTab3PageRoutingModule,
    TranslateModule,
  ],
  providers: [BleUserService],
  declarations: [SettingsTab3Page],
})
export class SettingsTab3PageModule {}

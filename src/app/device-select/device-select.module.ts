import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceSelectPageRoutingModule } from './device-select-routing.module';

import { DeviceSelectPage } from './device-select.page';
import { TranslateModule } from '@ngx-translate/core';
import { BleUserService } from '../services/bleuser.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceSelectPageRoutingModule,
    TranslateModule,
  ],
  declarations: [DeviceSelectPage],
  providers: [BleUserService],
})
export class DeviceSelectPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceConfigPageRoutingModule } from './device-config-routing.module';

import { DeviceConfigPage } from './device-config.page';
import { TranslateModule } from '@ngx-translate/core';
import { BleUserService } from '../services/bleuser.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceConfigPageRoutingModule,
    TranslateModule
  ],
  providers:[BleUserService],
  declarations: [DeviceConfigPage]
})
export class DeviceConfigPageModule {}

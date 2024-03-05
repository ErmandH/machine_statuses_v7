import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsGeneralComponent } from './settings-general.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BleUserService } from 'src/app/services/bleuser.service';

@NgModule({
  declarations: [SettingsGeneralComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [BleUserService],
  exports: [SettingsGeneralComponent],
})
export class SettingsGeneralModule {}

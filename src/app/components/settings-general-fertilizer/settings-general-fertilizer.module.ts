import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsGeneralFertilizerComponent } from './settings-general-fertilizer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BleUserService } from 'src/app/services/bleuser.service';

@NgModule({
  declarations: [SettingsGeneralFertilizerComponent],
  imports: [CommonModule, IonicModule, TranslateModule, ReactiveFormsModule],
  exports: [SettingsGeneralFertilizerComponent],
  providers: [BleUserService],
})
export class SettingsGeneralFertilizerModule {}

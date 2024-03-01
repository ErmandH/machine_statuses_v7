import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsGeneralFertilizerComponent } from './settings-general-fertilizer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SettingsGeneralFertilizerComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [SettingsGeneralFertilizerComponent]
})
export class SettingsGeneralFertilizerModule { }

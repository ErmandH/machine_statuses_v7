import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaInfoPageRoutingModule } from './area-info-routing.module';

import { AreaInfoPage } from './area-info.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaInfoPageRoutingModule,
    TranslateModule
  ],
  declarations: [AreaInfoPage]
})
export class AreaInfoPageModule {}

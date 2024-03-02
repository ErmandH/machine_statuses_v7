import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FertilizerPasswordModalComponent } from './fertilizer-password-modal.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [FertilizerPasswordModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    FertilizerPasswordModalComponent
  ]
})
export class FertilizerPasswordModalModule { }

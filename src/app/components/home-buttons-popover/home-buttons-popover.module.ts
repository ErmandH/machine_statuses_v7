import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeButtonsPopoverComponent } from './home-buttons-popover.component';
import { IonicModule } from '@ionic/angular';
import { AppLanguagePickerModule } from '../app-language-picker/app-language-picker.module';



@NgModule({
  declarations: [HomeButtonsPopoverComponent],
  imports: [
    CommonModule,
    IonicModule,
    AppLanguagePickerModule
  ],
  exports: [HomeButtonsPopoverComponent]
})
export class HomeButtonsPopoverModule { }

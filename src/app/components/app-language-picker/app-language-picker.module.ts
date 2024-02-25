import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePickerComponent } from './app-language-picker.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LanguagePickerComponent],
  imports: [CommonModule, IonicModule],
  exports: [LanguagePickerComponent],
})
export class AppLanguagePickerModule {}

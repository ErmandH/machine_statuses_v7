import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { AppLanguagePickerModule } from '../components/app-language-picker/app-language-picker.module';

import { HomeButtonsPopoverModule } from '../components/home-buttons-popover/home-buttons-popover.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, HomeButtonsPopoverModule,
    AppLanguagePickerModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

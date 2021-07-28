import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { FormsModule } from '@angular/forms';
import localept from '@angular/common/locales/pt';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {NgCalendarModule} from "ionic2-calendar";
import {CalModalPageModule} from "../cal-modal/cal-modal.module";
registerLocaleData(localept, 'pt');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [HomePage],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }]
})
export class HomePageModule {}

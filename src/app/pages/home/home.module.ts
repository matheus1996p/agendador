import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { FormsModule } from '@angular/forms';
import localept from '@angular/common/locales/pt';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {NgCalendarModule} from "ionic2-calendar";
import {CalModalPageModule} from "../cal-modal/cal-modal.module";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
registerLocaleData(localept, 'pt');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCalendarModule,
    CalModalPageModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonToggleModule
  ],
  declarations: [HomePage],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' },{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}]
})
export class HomePageModule {}

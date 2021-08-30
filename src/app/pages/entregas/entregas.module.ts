import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregasPageRoutingModule } from './entregas-routing.module';

import { EntregasPage } from './entregas.page';
import {CalendarModule} from "primeng/calendar";
import {TagModule} from "primeng/tag";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {TableModule} from "primeng/table";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {AccordionModule} from "primeng/accordion";
import {ScrollPanelModule} from "primeng/scrollpanel";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregasPageRoutingModule,
    CalendarModule,
    TagModule,
    MatExpansionModule,
    MatButtonModule,
    MatSlideToggleModule,
    TableModule,
    AccordionModule,
    ScrollPanelModule
  ],
  declarations: [EntregasPage],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' },{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}]
})
export class EntregasPageModule {}

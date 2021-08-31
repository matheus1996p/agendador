import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhaAgendaPageRoutingModule } from './minha-agenda-routing.module';

import { MinhaAgendaPage } from './minha-agenda.page';
import {CalendarModule} from "primeng/calendar";
import {TagModule} from "primeng/tag";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {TableModule} from "primeng/table";
import {AccordionModule} from "primeng/accordion";
import {ScrollPanelModule} from "primeng/scrollpanel";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhaAgendaPageRoutingModule,
    CalendarModule,
    TagModule,
    MatExpansionModule,
    MatButtonModule,
    MatSlideToggleModule,
    TableModule,
    AccordionModule,
    ScrollPanelModule
  ],
  declarations: [MinhaAgendaPage]
})
export class MinhaAgendaPageModule {}

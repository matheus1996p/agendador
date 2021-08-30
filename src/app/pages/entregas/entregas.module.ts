import { NgModule } from '@angular/core';
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
    MatSlideToggleModule
  ],
  declarations: [EntregasPage]
})
export class EntregasPageModule {}

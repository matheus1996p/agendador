import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissoesPageRoutingModule } from './permissoes-routing.module';

import { PermissoesPage } from './permissoes.page';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {MultiSelectModule} from 'primeng/multiselect';
import {AccordionModule} from 'primeng/accordion';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissoesPageRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatSlideToggleModule,
    ScrollPanelModule,
    MultiSelectModule,
    AccordionModule
  ],
  declarations: [PermissoesPage]
})
export class PermissoesPageModule {}

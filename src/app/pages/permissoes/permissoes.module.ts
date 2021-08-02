import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissoesPageRoutingModule } from './permissoes-routing.module';

import { PermissoesPage } from './permissoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissoesPageRoutingModule
  ],
  declarations: [PermissoesPage]
})
export class PermissoesPageModule {}

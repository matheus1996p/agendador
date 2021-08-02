import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSenhaPageRoutingModule } from './modal-senha-routing.module';

import { ModalSenhaPage } from './modal-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSenhaPageRoutingModule
  ],
  declarations: [ModalSenhaPage]
})
export class ModalSenhaPageModule {}

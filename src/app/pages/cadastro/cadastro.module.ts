import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';
import {NgxMaskIonicModule} from "ngx-mask-ionic";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CadastroPageRoutingModule,
        NgxMaskIonicModule
    ],
  declarations: [CadastroPage]
})
export class CadastroPageModule {}

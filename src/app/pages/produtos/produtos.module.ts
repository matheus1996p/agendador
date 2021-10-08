import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutosPageRoutingModule } from './produtos-routing.module';

import { ProdutosPage } from './produtos.page';
import {ScrollPanelModule} from "primeng/scrollpanel";
import {PickListModule} from "primeng/picklist";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutosPageRoutingModule,
    ScrollPanelModule,
    PickListModule
  ],
  declarations: [ProdutosPage]
})
export class ProdutosPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSenhaPage } from './modal-senha.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSenhaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissoesPage } from './permissoes.page';

const routes: Routes = [
  {
    path: '',
    component: PermissoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissoesPageRoutingModule {}

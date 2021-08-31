import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhaAgendaPage } from './minha-agenda.page';

const routes: Routes = [
  {
    path: '',
    component: MinhaAgendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhaAgendaPageRoutingModule {}

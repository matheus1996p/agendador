import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modal-senha',
    loadChildren: () => import('./pages/modal-senha/modal-senha.module').then( m => m.ModalSenhaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'permissoes',
    loadChildren: () => import('./pages/permissoes/permissoes.module').then( m => m.PermissoesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'entregas',
    loadChildren: () => import('./pages/entregas/entregas.module').then( m => m.EntregasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'minha-agenda',
    loadChildren: () => import('./pages/minha-agenda/minha-agenda.module').then( m => m.MinhaAgendaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pages/produtos/produtos.module').then( m => m.ProdutosPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'job',
    loadChildren: () => import('./job/job.module').then( m => m.JobPageModule)
  },
  {
    path: 'listc',
    loadChildren: () => import('./listc/listc.module').then( m => m.ListcPageModule)
  },
  {
    path: 'listb',
    loadChildren: () => import('./listb/listb.module').then( m => m.ListbPageModule)
  },
  {
    path: 'liste',
    loadChildren: () => import('./liste/liste.module').then( m => m.ListePageModule)
  },
  {
    path: 'listp',
    loadChildren: () => import('./listp/listp.module').then( m => m.ListpPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

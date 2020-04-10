import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementPage } from './management.page';

const routes: Routes = [
  {
    path: '',
    component: ManagementPage
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementPageRoutingModule {}

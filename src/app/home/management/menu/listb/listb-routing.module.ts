import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListbPage } from './listb.page';

const routes: Routes = [
  {
    path: '',
    component: ListbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListbPageRoutingModule {}

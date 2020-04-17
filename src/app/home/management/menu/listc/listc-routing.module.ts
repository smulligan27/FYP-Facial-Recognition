import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListcPage } from './listc.page';

const routes: Routes = [
  {
    path: '',
    component: ListcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListcPageRoutingModule {}

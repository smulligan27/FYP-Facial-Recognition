import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListpPage } from './listp.page';

const routes: Routes = [
  {
    path: '',
    component: ListpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListpPageRoutingModule {}

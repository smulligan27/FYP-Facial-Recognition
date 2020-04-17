import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListbPageRoutingModule } from './listb-routing.module';

import { ListbPage } from './listb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListbPageRoutingModule
  ],
  declarations: [ListbPage]
})
export class ListbPageModule {}

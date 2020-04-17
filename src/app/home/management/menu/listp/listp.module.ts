import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListpPageRoutingModule } from './listp-routing.module';

import { ListpPage } from './listp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListpPageRoutingModule
  ],
  declarations: [ListpPage]
})
export class ListpPageModule {}

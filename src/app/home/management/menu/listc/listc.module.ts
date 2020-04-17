import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListcPageRoutingModule } from './listc-routing.module';

import { ListcPage } from './listc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListcPageRoutingModule
  ],
  declarations: [ListcPage]
})
export class ListcPageModule {}

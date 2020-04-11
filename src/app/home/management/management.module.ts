import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManagementPageRoutingModule } from './management-routing.module';
import { ManagementPage } from './management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ManagementPageRoutingModule
  ],
  declarations: [ManagementPage]
})
export class ManagementPageModule {}
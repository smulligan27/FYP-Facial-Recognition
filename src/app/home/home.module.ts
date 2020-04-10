import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { homeRoutingModule } from './home.routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    homeRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

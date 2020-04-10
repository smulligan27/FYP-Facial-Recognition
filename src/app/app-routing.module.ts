import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  //{ path: 'contractor', loadChildren: () => import('./home/contractor/contractor.module').then( m => m.ContractorPageModule)},
  //{ path: 'management', loadChildren: () => import('./home/management/management.module').then( m => m.ManagementPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) // , { preloadingStrategy: PreloadAllModules }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

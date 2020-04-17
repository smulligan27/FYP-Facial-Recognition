import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ManagementPage } from './management/management.page';
import { ContractorPage } from './contractor/contractor.page';

// Routes for the tab buttons
const routes: Routes = [
    {
        path: 'tabs',
        component: HomePage,
        children: [
            {
              path: 'contractor',
              children: [
                  {
                    path: '',
                    loadChildren: './contractor/contractor.module#ContractorPageModule'
                  }
              ]
            },
            {
                path: 'management',
                children: [
                    {
                        path: '',
                        loadChildren: './management/management.module#ManagementPageModule'
                    }
                ]
            }
            ]
    },
    {
        path: '',
        redirectTo: 'tabs/contractor',
        pathMatch: 'full'
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class homeRoutingModule {}

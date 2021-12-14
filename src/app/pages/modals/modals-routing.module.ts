import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalsPage } from './modals.page';

const routes: Routes = [
  {
    path: '',
    component: ModalsPage
  },
  {
    path: 'editmodal',
    loadChildren: () => import('./editmodal/editmodal.module').then( m => m.EditmodalPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalsPageRoutingModule {}

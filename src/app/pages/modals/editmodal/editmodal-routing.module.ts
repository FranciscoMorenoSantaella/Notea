import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { EditmodalPage } from './editmodal.page';

const routes: Routes = [
  {
    path: '',
    component: EditmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditmodalPageRoutingModule {}

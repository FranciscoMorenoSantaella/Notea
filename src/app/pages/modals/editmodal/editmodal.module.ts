import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditmodalPageRoutingModule } from './editmodal-routing.module';

import { EditmodalPage } from './editmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditmodalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditmodalPage]
})
export class EditmodalPageModule {}

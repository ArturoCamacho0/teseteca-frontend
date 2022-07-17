import { MomentPipe } from './moment/moment.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MomentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MomentPipe
  ]
})
export class PipesModule { }

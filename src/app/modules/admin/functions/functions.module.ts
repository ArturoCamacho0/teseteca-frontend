import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionsRoutingModule } from './functions-routing.module';
import { FunctionsComponent } from './functions.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CinemaComponent } from './create/cinema/cinema.component';


@NgModule({
  declarations: [
    FunctionsComponent,
    CreateComponent,
    UpdateComponent,
    CinemaComponent
  ],
  imports: [
    CommonModule,
    FunctionsRoutingModule,
    ComponentsModule,
    HttpClientModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FunctionsModule { }

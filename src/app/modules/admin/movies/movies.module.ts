import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentsModule } from './../../../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploaderModule } from 'angular-uploader';
import { CategoryComponent } from './create/category/category.component';
import { ClassificationComponent } from './create/classification/classification.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    MoviesComponent,
    CreateComponent,
    UpdateComponent,
    CategoryComponent,
    ClassificationComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UploaderModule,
    ComponentsModule,
    PipesModule
  ]
})
export class MoviesModule { }

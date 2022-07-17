import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: '', component: AdminComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'movies', loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule) },
    { path: 'functions', loadChildren: () => import('./functions/functions.module').then(m => m.FunctionsModule) },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

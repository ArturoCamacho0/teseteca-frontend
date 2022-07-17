import { FunctionsUserComponent } from './functions-user/functions-user.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FunctionsComponent } from './functions/functions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  { path: '', component: ViewsComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'movie/:id', component: FunctionsComponent },
    { path: 'reservation/movie/:id', component: ReservationComponent },
    { path: 'reservations', component: FunctionsUserComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }

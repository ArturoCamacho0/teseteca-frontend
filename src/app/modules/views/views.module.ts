import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from './../../pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxButtonGroupModule, IgxButtonModule, IgxStepperModule } from 'igniteui-angular';

import { ViewsRoutingModule } from './views-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ViewsComponent } from './views.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { FunctionsComponent } from './functions/functions.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FunctionsUserComponent } from './functions-user/functions-user.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ViewsComponent,
    FooterComponent,
    FunctionsComponent,
    ReservationComponent,
    FunctionsUserComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    SwiperModule,
    FormsModule,
    HttpClientModule,
    PipesModule,
    IgxStepperModule,
    IgxButtonModule,
    IgxButtonGroupModule,
    ComponentsModule
  ]
})
export class ViewsModule { }

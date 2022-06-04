import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ViewsComponent } from './views.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ViewsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    SwiperModule,
    FormsModule
  ]
})
export class ViewsModule { }

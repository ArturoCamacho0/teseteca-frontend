import { Functions } from 'src/app/models/Functions';
import { FunctionsService } from './../../../services/functions/functions.service';
import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-functions-user',
  templateUrl: './functions-user.component.html',
  styleUrls: ['./functions-user.component.scss'],
  providers: [ReservationService, FunctionsService]
})
export class FunctionsUserComponent implements OnInit {
  reservations: any[] = [];
  functions: any[] = [];
  id_user: number = 0;

  constructor(private reservationService: ReservationService, private functionService: FunctionsService) {
    this.id_user = JSON.parse(localStorage.getItem('user') || '').id;
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getFunction(id_function: number) {
    this.functionService.get(id_function).subscribe({
      next: response => {
        this.functions.push(response);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getReservations() {
    this.reservationService.getByUser(this.id_user).subscribe({
      next: response => {
        this.reservations = response;

        this.reservations.forEach(element => {
          this.getFunction(element.function_id);
        });

        console.log(this.functions);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

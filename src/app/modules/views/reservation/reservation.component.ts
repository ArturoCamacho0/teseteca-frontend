import { ReservationService } from './../../../services/reservation/reservation.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './../../../models/Movie';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MovieService } from './../../../services/movie/movie.service';
import { IgxStepperComponent } from 'igniteui-angular';
import { Functions } from 'src/app/models/Functions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [MovieService, FunctionsService, ReservationService]
})
export class ReservationComponent implements OnInit {
  loading: boolean = false;
  message: string = '';
  type: string = '';

  cols: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  rows: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  asientos$: Observable<string[]>;
  listAsientos: string[] = [];
  reservaciones$: Observable<JSON[]>

  movie: Movie;
  functions: Functions[] = [];
  dates: Array<any> = [];
  tikets: number = 0;
  hours: any = [];
  price = 0;

  id_function = 0;
  id_date = 0;
  string_date = '';
  id_hour = 0;
  string_hour = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private functionService: FunctionsService,
    private reservationService: ReservationService
  ) {
    this.movie = new Movie(0, '', '', '', true, '', 0, 0);
    this.asientos$ = this.functionService.seleccionados$;
    this.reservaciones$ = this.functionService.reservacioneshechas$;
  }

  ngOnInit(): void {
    this.getMovie();
    this.getFunctions();

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getMovie() {
    const id = parseInt(this.route.snapshot.params['id']);
    this.movieService.getById(id).subscribe({
      next: response => {
        this.movie = response;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  sum() {
    if (this.tikets < 10) this.tikets = this.tikets + 1;
  }

  sub() {
    if (this.tikets > 0) this.tikets = this.tikets - 1;
  }

  getFunctions() {
    const id = parseInt(this.route.snapshot.params['id']);

    this.functionService.getByMovie(id).subscribe({
      next: response => {
        this.functions = response;

        this.functions.map(element => {
          element.dates.map(date => {
            let data = JSON.parse(JSON.stringify(date));

            data = { id: data.id, date: data.date, pivot: data.pivot }
            if (this.dates.filter(e => e.id === data.id).length <= 0) {
              this.dates.push(data);
            }
          })
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getDatesHours() {
    this.hours = [];

    this.functions.forEach(element => {
      const fun = element;
      element.hours?.map(hour => {
        const data = JSON.parse(JSON.stringify(hour));

        data.dates.map((element: any) => {
          if (this.id_date == element.id) {
            this.string_date = element.date;
            this.hours.push(data);
            this.id_function = data.pivot.function_id;
            this.price = fun.price;
          }
        });
      });
    });
  }

  setHour(hour: any) {
    this.id_hour = hour.id;
    this.string_hour = hour.hour;
  }


  selectSeat(seat: string) {
    if (this.tikets !== this.functionService.asientos.length) {
      this.functionService.asientos.push(seat);
      this.listAsientos.push(seat);
    }
  }

  isSelected(seat: string) {
    return this.functionService.asientos.includes(seat);
  }

  saveReservation() {
    this.loading = true;

    const reservation = {
      quantity: this.tikets,
      status: 1,
      function_id: this.id_function,
      user_id: JSON.parse(localStorage.getItem('user') || '').id,
      date: this.id_date,
      hour: this.id_hour
    };

    this.reservationService.create(reservation).subscribe({
      next: response => {
        console.log(response);
        this.loading = false;

        this.type = 'success';
        this.message = 'La reservacion se ha realizado correctamente';

        setTimeout(() => {
          this.type = '';
        this.message = '';
        }, 5000);
      },
      error: err => {
        console.log(err);
        this.loading = false;

        this.type = 'error';
        this.message = 'Ha ocurrido un error al realizar la reservacion';

        setTimeout(() => {
          this.type = '';
        this.message = '';
        }, 5000);
      }
    });
  }

}

import { CinemaService } from './../../../../services/cinema/cinema.service';
import { Movie } from 'src/app/models/Movie';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Functions } from 'src/app/models/Functions';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Cinema } from 'src/app/models/Cinema';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [FunctionsService, MovieService, CinemaService]
})
export class CreateComponent implements OnInit {
  hour: string = '';
  hours: Array<string> = [];
  date: string = '';
  price: string = '';
  cinema_id: number = 0;

  movie_id: number = 0;
  movie: Movie;

  functions: any = [];

  cinema_modal: boolean = false;
  message: string = '';
  type_alert: string = '';
  loading: boolean = false;

  cinemas: Cinema[] = [];

  today: Date = new Date();
  today_input: FormControl = new FormControl(
    new Date(), [
    Validators.required,
  ]);

  constructor(
    private functionsService: FunctionsService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private cinemaService: CinemaService
  ) {
    this.movie = new Movie(0, '', '', '', false, '', 0, 0);
  }

  ngOnInit(): void {
    this.getMovie();

    this.getFunctions();
    this.getCinemas();
  }

  closeModalCinema() {
    this.cinema_modal = !this.cinema_modal;
    this.getCinemas();
  }

  getCinemas() {
    this.cinemaService.getAll().subscribe({
      next: response => {
        this.cinemas = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getMovie() {
    this.movie_id = this.route.snapshot.params['id'];

    this.movieService.getById(this.movie_id).subscribe({
      next: (movie: Movie) => {
        this.movie = movie;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getFunctions() {
    this.functionsService.getByMovie(this.movie_id).subscribe({
      next: (functions) => {
        functions = JSON.parse(JSON.stringify(functions));
        this.functions = functions;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addHour() {
    if (!this.hours.includes(this.hour)) {
      this.hours.push(this.hour);
      this.hour = '';
    }
  }

  removeHour(hour: string) {
    if (this.hours.includes(hour)) {
      this.hours = this.hours.filter(element => element !== hour);
    }
  }

  saveFunction() {
    this.loading = true;

    const function_to_save = {
      price: parseFloat(this.price),
      movie_id: this.movie_id,
      cinema_id: this.cinema_id,
      dates: [
        {
          date: this.date,
          hours: this.hours
        }
      ]
    };

    this.functionsService.create(JSON.parse(JSON.stringify(function_to_save))).subscribe({
      next: response => {
        response = JSON.parse(JSON.stringify(response));

        this.loading = false;
        this.type_alert = 'success';
        this.message = 'La película se ha creado correctamente';

        this.price = '';
        this.movie_id = 0;
        this.cinema_id = 0;
        this.date = '';
        this.hours = [];

        setTimeout(() => {
          this.type_alert = '';
          this.message = '';
        }
          , 5000);
      },
      error: err => {
        console.log(err);
        this.loading = false;
        this.type_alert = 'error';

        this.message = 'Ha ocurrido un error al crear la funcion';

        if (err.error.status == 500) {
          this.message = 'Ha ocurrido un error en el servidor';
        }

        if (err.error.status == 400) {
          this.message = 'Ha ocurrido un error al crear la funcion';
        }

        if (err.error.status == 401) {
          this.message = 'No tienes permisos para crear una funcion';
        }

        if (err.error.status == 0) {
          this.message = 'No se pudo conectar con el servidor';
        }

        setTimeout(() => {
          this.type_alert = '';
          this.message = '';
        }
          , 5000);
      }
    });
  }

}

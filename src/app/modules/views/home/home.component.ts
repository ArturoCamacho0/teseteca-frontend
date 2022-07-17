import { Cinema } from './../../../models/Cinema';
import { CinemaService } from './../../../services/cinema/cinema.service';
import { Movie } from './../../../models/Movie';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
import { MovieService } from 'src/app/services/movie/movie.service';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MovieService, CinemaService]
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  cinemas: Cinema[] = [];
  cinema_selected: number = 0;

  constructor(private movieService: MovieService, private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.getMovies();
    this.getCinemas();
  }

  getMovies() {
    this.movieService.getAll().subscribe({
      next: movies => {
        this.movies = movies.filter(movie => movie.status);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getCinemas() {
    this.cinemaService.getAll().subscribe({
      next: response => {
        this.cinemas = response;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}

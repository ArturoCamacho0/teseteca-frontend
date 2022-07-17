import { Component, OnInit } from '@angular/core';
import { Movie } from './../../../models/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss'],
  providers: [MovieService]
})
export class FunctionsComponent implements OnInit {
  loading: boolean = false;
  deleteModal = false;
  idToDelete: number = 0;

  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.loading = true;

    this.movieService.getAll().subscribe({
      next: (movies: Movie[]) => {
        this.movies = movies.filter(movie => movie.status);
        console.log(movies);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  deleteMovie(movie: Movie) {
    this.deleteModal = true;

    this.idToDelete = movie.id;
  }

}

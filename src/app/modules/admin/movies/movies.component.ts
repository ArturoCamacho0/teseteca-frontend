import { Movie } from './../../../models/Movie';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  providers: [MovieService]
})
export class MoviesComponent implements OnInit, OnChanges {

  constructor(private movieService: MovieService) { }
  movies: Movie[] = [];
  loading: boolean = false;

  deleteModal = false;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.getMovies();
  }

  refresh() {
    this.getMovies();
  }

  ngOnChanges() {
    this.getMovies()
  }

  getMovies() {
    this.loading = true;

    this.movieService.getAll().subscribe({
      next: (movies: Movie[]) => {
        this.movies = movies;
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

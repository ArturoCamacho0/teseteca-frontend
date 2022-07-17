import { Functions } from './../../../models/Functions';
import { Movie } from './../../../models/Movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './../../../services/movie/movie.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss'],
  providers: [FunctionsService, MovieService]
})
export class FunctionsComponent implements OnInit {
  movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private functionService: FunctionsService
  ) {
    const id = parseInt(this.route.snapshot.params['id']);
    this.movie = new Movie(id, '', '', '', true, '', 0, 0);
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.getMovie();
  }

  getMovie() {
    this.movieService.getById(this.movie.id).subscribe({
      next: response => {
        this.movie = response;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

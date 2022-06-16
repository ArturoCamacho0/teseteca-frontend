import { Movie } from './../../../../models/Movie';
import { MovieService } from './../../../../services/movie/movie.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  providers: [MovieService]
})
export class DeleteComponent implements OnInit {
  @Input() id: number = 0;
  @Input() open: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() movies: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  loading: boolean = false;
  message: string = '';
  status: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  getMovies() {
    this.movieService.getAll().subscribe({
      next: (movies: Movie[]) => {
        this.movies.emit(movies);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteMovie() {
    this.loading = true;

    this.movieService.delete(this.id).subscribe({
      next: (data) => {
        this.status = 'success';
        this.message = 'El registro se ha eliminado correctamente';
        this.loading = false;

        this.open = false;
        this.close.emit(false);

        this.getMovies();

        setTimeout(() => {
          this.status = '';
          this.message = '';
        }, 5000);
      },
      error: (err) => {
        this.status = 'error';
        this.message = 'Ha ocurrido un error al eliminar el registro';

        this.loading = false;
      }
    });
  }

  closeModal() {
    this.open = false;
    this.close.emit(false);
  }
}

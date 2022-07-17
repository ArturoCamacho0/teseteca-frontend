import { Cinema } from './Cinema';
import { Movie } from 'src/app/models/Movie';
import { Hour } from './Hour';

export class Functions {
  [x: string]: any;
  id: number;
  price: number;
  movie_id: number;
  cinema_id: number;
  dates: JSON[];
  hours?: any[];
  movie?: Movie;
  cinema?: Cinema;

  constructor(id: number, price: number, movie_id: number, cinema_id: number, dates: JSON[]) {
    this.id = id;
    this.price = price;
    this.movie_id = movie_id;
    this.cinema_id = cinema_id;
    this.dates = dates;
  }
}

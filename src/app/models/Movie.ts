import { Category } from './Category';
import { Classification } from './Classification';
export class Movie {
  id: number;
  title: string;
  description: string;
  poster: string;
  status: boolean;
  date: string;
  category_id: number;
  classification_id: number;
  category?: Category;
  classification?: Classification;

  constructor(id: number, title: string, description: string, poster: string, status: boolean, date: string, category_id: number, classification_id: number, category?: Category, classification?: Classification) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.poster = poster;
    this.status = status;
    this.date = date;
    this.category_id = category_id;
    this.classification_id = classification_id;
    this.category = category;
    this.classification = classification;
  }
}

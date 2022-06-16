import { ClassificationService } from './../../../../services/classification/classification.service';
import { CategoryService } from './../../../../services/category/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Category } from 'src/app/models/Category';
import { Classification } from 'src/app/models/Classification';
import { Uploader, UploaderOptions, UploaderResult, UploaderLocale } from "uploader";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MovieService, CategoryService, ClassificationService]
})
export class UpdateComponent implements OnInit {
  id: number = 0;

  movie: FormGroup;
  category: boolean = false;
  classification: boolean = false;
  loading: boolean = false;
  message: string = 'Esto es un mensaje predeterminado';
  type_alert: string = '';
  status: boolean = false;

  categories: Category[] = [];
  classifications: Classification[] = [];

  uploaderLanguage: UploaderLocale = {
    "error!": "Error!",
    "done": "Finalizado",
    "addAnotherFile": "Añadir otro archivo...",
    "addAnotherImage": "Añadir otra imágen...",
    "cancel": "Cancelar",
    "cancelled!": "Cancelado!",
    "continue": "Continuar",
    "crop": "Recortar",
    "finish": "Guardar imagen",
    "finishIcon": true,
    "image": "Imágen",
    "maxSize": "Tamaño máximo:",
    "next": "Siguiente",
    "of": "de",
    "orDragDropFile": "...o arrastre un archivo.",
    "orDragDropFiles": "...o arrastre archivos.",
    "orDragDropImage": "...o arrastre una imágen.",
    "orDragDropImages": "...o arrastre imágenes.",
    "pleaseWait": "Por favor espere...",
    "removed!": "Eliminado!",
    "remove": "Eliminar",
    "skip": "Saltar",
    "unsupportedFileType": "Tipo de archivo no soportado.",
    "uploadFile": "Subir archivo",
    "uploadFiles": "Subir un archivo",
    "uploadImage": "Subir imágen",
    "uploadImages": "Subir imágenes"
  };

  options: UploaderOptions = {
    mimeTypes: ["image/jpeg", "image/png", "image/gif", "image/jpg"],
    maxFileSizeBytes: 10000000,
    multi: false,
    showRemoveButton: true,
    showFinishButton: true,
    locale: this.uploaderLanguage as UploaderLocale,
    editor: {
      images: {
        crop: false,
      }
    }
  };

  uploader = new Uploader({
    apiKey: "public_FW25arS5Nvyz83uikMvDkzQsuouu",
  });

  uploadComplete = (files: UploaderResult[]) => {
    this.options.showFinishButton = false;

    files.map(x => x.fileUrl).forEach(x => {
      this.movie.get('poster')?.setValue(x);
    });
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private categoryService: CategoryService,
    private classificationService: ClassificationService) {
    this.movie = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      poster: new FormControl('', [Validators.required]),
      status: new FormControl(''),
      date: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      classification_id: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.getMovie();
    this.getCategories();
    this.getClassifications();
  }

  getMovie() {
    this.movieService.getById(this.id).subscribe({
      next: (movie: Movie) => {
        this.movie.setValue({
          title: movie.title,
          description: movie.description,
          poster: movie.poster,
          status: movie.status,
          date: movie.date,
          category_id: movie.category_id,
          classification_id: movie.classification_id,
        });
        this.status = movie.status;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  classificationModal(event: any) {
    event.preventDefault();

    this.type_alert = '';
    this.classification = !this.classification;
  }

  getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getClassifications() {
    this.classificationService.getAll().subscribe({
      next: (data) => {
        this.classifications = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  closeCategory(event: any) {
    this.category = false;
  }

  closeModalCategory() {
    this.category = !this.category;
    this.getCategories();
  }

  closeModalClassification() {
    this.classification = !this.classification;
    this.getClassifications();
  }

  categoryModal(event: any) {
    event.preventDefault();

    this.type_alert = '';
    this.category = !this.category;
  }

  onSubmit() {
    this.loading = true;

    const movie: Movie = new Movie(
      this.id,
      this.movie.get('title')?.value || '',
      this.movie.get('description')?.value || '',
      this.movie.get('poster')?.value || '',
      this.movie.get('status')?.value || '',
      this.movie.get('date')?.value || '',
      this.movie.get('category_id')?.value || '',
      this.movie.get('classification_id')?.value || ''
    );

    this.movieService.update(movie).subscribe({
      next: (data) => {
        this.loading = false;
        this.message = 'Película actualizada correctamente';
        this.type_alert = 'success';

        setTimeout(() => {
          this.status = false;
          this.message = '';
          this.type_alert = '';
        }, 3000);

        this.router.navigate(['/admin/movies']);
      },
      error: (err) => {
        this.loading = false;
        this.message = 'Error al actualizar la película';
        this.type_alert = 'error';

        console.log(err);

        setTimeout(() => {
          this.status = false;
          this.message = '';
          this.type_alert = '';
        }
          , 3000);
      }
    });
  }

}

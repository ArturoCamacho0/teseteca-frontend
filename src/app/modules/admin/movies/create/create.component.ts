import { ClassificationService } from './../../../../services/classification/classification.service';
import { Classification } from 'src/app/models/Classification';
import { Category } from './../../../../models/Category';
import { CategoryService } from './../../../../services/category/category.service';
import { MovieService } from './../../../../services/movie/movie.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/Movie';
import { Uploader, UploaderOptions, UploaderResult, UploaderLocale } from "uploader";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [MovieService, CategoryService, ClassificationService]
})
export class CreateComponent implements OnInit {
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

  constructor(private movieService: MovieService, private categoryService: CategoryService, private classificationService: ClassificationService) {
    this.movie = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      poster: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      classification_id: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getClassifications();
  }

  categoryModal(event: any) {
    event.preventDefault();

    this.type_alert = '';
    this.category = !this.category;
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

  onSubmit() {
    this.loading = true;

    const movie = new Movie(
      0,
      this.movie.value.title,
      this.movie.value.description,
      this.movie.value.poster,
      this.status,
      this.movie.value.date,
      this.movie.value.category_id,
      this.movie.value.classification_id
    );

    this.movieService.create(movie).subscribe({
      next: (data) => {
        this.loading = false;
        this.type_alert = 'success';
        this.message = 'La película se ha creado correctamente';

        this.movie.reset();

        this.options.showFinishButton = true;

        setTimeout(() => {
          this.type_alert = '';
          this.message = '';
        }
        , 5000);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.type_alert = 'error';

        this.message = 'Ha ocurrido un error al crear la película';

        if(err.error.status == 500) {
          this.message = 'Ha ocurrido un error en el servidor';
        }

        if(err.error.status == 400) {
          this.message = 'Ha ocurrido un error al crear la película';
        }

        if(err.error.status == 401) {
          this.message = 'No tienes permisos para crear una película';
        }

        if(err.error.status == 0) {
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

}

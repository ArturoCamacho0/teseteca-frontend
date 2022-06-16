import { CategoryService } from './../../../../../services/category/category.service';
import { Category } from './../../../../../models/Category';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  @Input() open: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  loading: boolean = false;
  message: string = '';
  status: string = '';

  category: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.open = false;

    this.close.emit(false);
  }

  save() {
    this.loading = true;

    const category = new Category(0, this.category.value.name);

    this.categoryService.create(category).subscribe({
      next: (data) => {
        this.status = 'success';
        this.message = 'La categoría se ha creado correctamente';
        this.category.reset();

        this.loading = false;

        this.open = false;
        this.close.emit(false);

        setTimeout(() => {
          this.status = '';
          this.message = '';
        }, 5000);
      },
      error: (err) => {
        this.status = 'error';
        this.message = 'Ha ocurrido un error al crear la categoría';

        this.loading = false;

        setTimeout(() => {
          this.status = '';
          this.message = '';
        }, 5000);
      }
    });
  }

}

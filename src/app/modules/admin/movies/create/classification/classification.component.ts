import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Classification } from 'src/app/models/Classification';
import { ClassificationService } from 'src/app/services/classification/classification.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss'],
  providers: [ClassificationService]
})
export class ClassificationComponent implements OnInit {
  @Input() open: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  loading: boolean = false;
  message: string = '';
  status: string = '';

  classification: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private classificationService: ClassificationService) { }

  ngOnInit(): void {
  }

  save() {
    this.loading = true;

    const classification: Classification = new Classification(0, this.classification.value.name);

    this.classificationService.create(classification).subscribe({
      next: (data) => {
        this.status = 'success';
        this.message = 'La clasificación se ha creado correctamente';
        this.classification.reset();

        this.loading = false;

        this.open = false;
        this.close.emit(false);

        setTimeout(() => {
          this.status = '';
          this.message = '';
        }
        , 5000);
      },
      error: (err) => {
        this.status = 'error';
        this.message = 'Ha ocurrido un error al crear la clasificación';

        this.loading = false;
        this.close.emit(false);
        this.open = false;

        setTimeout(() => {
          this.status = '';
          this.message = '';
        }
        , 5000);
      }
    });

    this.classification.reset();
  }

  closeModal() {
    this.open = false;

    this.close.emit(false);
  }

}

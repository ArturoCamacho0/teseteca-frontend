import { Cinema } from './../../../../../models/Cinema';
import { CinemaService } from './../../../../../services/cinema/cinema.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss'],
  providers: [CinemaService]
})
export class CinemaComponent implements OnInit {
  @Input() open: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  loading: boolean = false;
  message: string = '';
  status: string = '';

  cinema: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.open = false;

    this.close.emit(false);
  }

  saveCinema() {
    const cinema: Cinema = new Cinema(0, this.cinema.value.name);

    this.cinemaService.create(cinema).subscribe({
      next: response => {
        this.status = 'success';
        this.message = 'El cine se ha creado correctamente';
        this.cinema.reset();

        this.loading = false;

        this.open = false;
        this.close.emit(false);

        setTimeout(() => {
          this.status = '';
          this.message = '';
        }, 5000);
      },
      error: error => {
        this.status = 'error';
        this.message = 'Ha ocurrido un error al crear el cine';

        this.loading = false;

        setTimeout(() => {
          this.status = '';
          this.message = '';
        }, 5000);
      }
    });
  }

}

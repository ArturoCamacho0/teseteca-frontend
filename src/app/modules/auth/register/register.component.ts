import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  user: FormGroup;
  error = false;
  loading = false;
  message_alert = '';

  constructor(private userService: UserService, private router: Router) {
    this.user = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/']);
    }
  }

  submit() {
    this.loading = true;

    let user = new User(this.user.value.name, this.user.value.lastname, this.user.value.email, this.user.value.password, 0);

    this.userService.register(user).subscribe({
      next: () => {
        this.user.reset();
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        const ERROR = JSON.parse(JSON.stringify(error));

        this.error = true;

        if(ERROR.error.message === 'User already exists') {
          this.message_alert = 'El usuario ya existe';
        }

        if(ERROR.error.message === 'Validation error') {
          this.message_alert = 'El correo ya existe';
        }

        if(ERROR.status === 500) {
          this.message_alert = 'Error interno del servidor';
        }

        if(ERROR.status === 0) {
          this.message_alert = 'Error de conexión';
        }

        this.loading = false;
      }
    });
  }

}

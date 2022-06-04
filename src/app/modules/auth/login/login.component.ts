import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  error: boolean = false;
  loading: boolean = false;
  message_alert = '';

  constructor(private userService: UserService, private router: Router) {
    this.user = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/']);
    }
  }

  submit(){
    this.loading = true;

    this.userService.login(this.user.value).subscribe({
      next: response => {
        const RESPONSE = JSON.parse(JSON.stringify(response));

        if(RESPONSE.token && RESPONSE.user) {
          localStorage.setItem('token', JSON.stringify(RESPONSE.token));
          localStorage.setItem('user', JSON.stringify(RESPONSE.user));
          this.router.navigate(['/']);
        }

        this.loading = false;
      },
      error: error => {
        const ERROR = JSON.parse(JSON.stringify(error));
        this.error = true;
        console.log(ERROR);

        if(ERROR.status === 401) {
          this.message_alert = 'El usuario o la contraseña son incorrectos';
        }

        if(ERROR.status === 500) {
          this.message_alert = 'Error del servidor';
        }

        if(ERROR.status === 0) {
          this.message_alert = 'Error de conexión';
        }

        this.loading = false;

        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  user: User = new User('', '', '', '', 0);
  isAdmin: boolean = false;
  dropdown: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('token') ? true : false;

    this.user = localStorage.getItem('user') ?
      this.user.getUserLogged() :
      new User('', '', '', '', 0);

    this.isAdmin = this.user.role === 0 ? false : true;

    console.log(this.user);
  }

  logout() {
    localStorage.clear();
    this.dropdown = false;
    this.isLogged = false;
  }

}

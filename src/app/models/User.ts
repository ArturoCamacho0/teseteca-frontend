export class User {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: number;

  constructor(name: string, lastname: string, email: string, password: string, role: number) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export class UserModel {
  public id: number;
  public name: string;
  public email: string;
  public password: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.password = '';
  }
}

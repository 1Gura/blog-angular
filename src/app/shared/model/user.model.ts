import {Role} from '../../admin/shared/enum/role.enum';

export class UserModel {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public role: Role;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.password = '';
    this.role = Role.User;
  }
}

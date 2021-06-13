import {UserModel} from './user.model';

export class TokenModel extends UserModel {
  public tokenString: string;
  public timeLife: number;
  constructor() {
    super();
    this.tokenString = '';
    this.timeLife = 0;
  }
}

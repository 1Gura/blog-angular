import {FormControl, FormGroup, Validators} from '@angular/forms';

export class LoginFormGroup extends FormGroup {

  constructor() {
    super({
      email: new FormControl(null, [
        Validators.pattern('^([a-z0-9_\\.-])+@[a-z0-9-]+\\.([a-z]{2,4}\\.)?[a-z]{2,4}$'),
        Validators.required]),
      password: new FormControl(null, [
        Validators.pattern('[0-9a-zA-Z!@#$%^&*]{6,}'),
        Validators.required])
    });
  }
}

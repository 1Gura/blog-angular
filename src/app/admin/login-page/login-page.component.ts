import {Component, OnInit} from '@angular/core';
import {LoginFormGroup} from '../form-group/login.form-group';
import {UserModel} from '../../shared/model/user.model';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {decimalDigest} from '@angular/compiler/src/i18n/digest';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public dataForm: LoginFormGroup = new LoginFormGroup();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.dataForm.invalid) {
      return;
    }
    const user: UserModel = new UserModel();
    this.authService.login(user).subscribe((data: UserModel[]) => {
      debugger
      console.log(data);
      this.dataForm.reset();
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}

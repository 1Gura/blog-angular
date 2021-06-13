import {Component, OnInit} from '@angular/core';
import {LoginFormGroup} from '../form-group/login.form-group';
import {UserModel} from '../../shared/model/user.model';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {TokenModel} from '../../shared/model/token.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public dataForm: LoginFormGroup = new LoginFormGroup();
  public submitted: boolean = false;
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.dataForm.invalid) {
      return;
    }
    this.submitted = true;
    const user: UserModel = new UserModel();
    this.authService.login(user).subscribe((token: TokenModel) => {
      console.log(token);
      this.dataForm.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, ()=>{
      this.submitted = false;
      setTimeout(()=>{
        this.authService.error$.next('')
      }, 3000)
    });
  }
}

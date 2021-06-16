import {Component, OnInit} from '@angular/core';
import {LoginFormGroup} from '../form-group/login.form-group';
import {UserModel} from '../../shared/model/user.model';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TokenModel} from '../../shared/model/token.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public dataForm: LoginFormGroup = new LoginFormGroup();
  public submitted: boolean = false;
  public message: string = '';
  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params)=>{
      if(params['loginAgain']) {
        this.message = 'Войдите в личный кабинет'
      } else if (params['authField']) {
        this.message = 'Сессия истекла';
      }
    })
  }

  submit() {
    if (this.dataForm.invalid) {
      return;
    }
    this.submitted = true;
    let user: UserModel = new UserModel();
    user.email = this.dataForm.value.email;
    user.password = this.dataForm.value.password;
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

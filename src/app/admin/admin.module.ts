import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DahsboardPageComponent} from './dahsboard-page/dahsboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/services/auth.service';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';
import {PostsService} from '../shared/posts.service';
import {SearchPipe} from '../shared/searchPipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import {AlertService} from './shared/services/alert.service';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DahsboardPageComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreatePageComponent},
      {path: 'post/:id/edit', component: EditPageComponent},
    ]
  }
];

@NgModule({
  declarations: [AdminLayoutComponent, LoginPageComponent, DahsboardPageComponent, CreatePageComponent, EditPageComponent, SearchPipe, AlertComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, SharedModule],
  // @ts-ignore
  exports: [RouterModule],
  providers: [AuthService, AuthGuard, AlertService]
})

export class AdminModule {

}

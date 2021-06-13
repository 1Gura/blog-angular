import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-dahsboard-page',
  templateUrl: './dahsboard-page.component.html',
  styleUrls: ['./dahsboard-page.component.scss']
})
export class DahsboardPageComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  test() {
    console.log(this.auth.token);
  }
}

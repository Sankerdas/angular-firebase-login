import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFrm = this.dataService.loginForm;

  login() {
    if (this.loginFrm.valid) {
      console.log('valid ' + this.loginFrm);
    } else {
      console.log('not valid ' + this.loginFrm);
    }

  }

  constructor(public  dataService: DataService) { }

  ngOnInit() {
  }

}

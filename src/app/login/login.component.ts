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
      const loginData = this.loginFrm.value;
      this.dataService.userLogin(loginData);
      this.loginFrm.reset();
    } else {
      console.log('not valid ');
    }
  }

  logout() {
    this.dataService.userLogout();
  }

  constructor(public  dataService: DataService) { }

  ngOnInit() {
  }

}

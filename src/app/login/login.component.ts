import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public  dataService: DataService, private localStorage: LocalStorageService, private router: Router) { }

  loginFrm = this.dataService.loginForm;
  chklogin: any;
  shwResponse: any;

  login() {
    if (this.loginFrm.valid) {
      const loginData = this.loginFrm.value;
      const result = this.dataService.userLogin(loginData);
      console.log(result);

      if (result === 'match') {
        this.shwResponse = 'Matched';
        this.localStorage.store('mcqz', loginData.email);
        this.router.navigate(['profile']);

      } else if (result === 'notmatch') {
        this.shwResponse = 'Not Matching Please try again';

      } else if (result === 'err') {
      this.shwResponse = 'Error Please try again';
      }

      this.loginFrm.reset();

    } else {
      console.log('not valid ');
    }
  }

  logout() {
    this.dataService.userLogout();
  }


  ngOnInit() {
  }

}

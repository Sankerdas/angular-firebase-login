import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public  dataService: DataService, private localStorage: LocalStorageService) { }

  loginFrm = this.dataService.loginForm;
  chklogin: any;
  logError: any;
  isErr = false;

  login() {
    if (this.loginFrm.valid) {
      const loginData = this.loginFrm.value;
      this.dataService.userLogin(loginData).subscribe( res => {
        this.chklogin = res;
      });
      console.log(this.chklogin);
      this.errorWithCatch(this.chklogin);
      this.loginFrm.reset();

    } else {
      console.log('not valid ');
    }
  }

    errorWithCatch(chk) {
    try {
      if (chk.length === 1) {
        this.localStorage.store('mcqz', chk[0].email);
        console.log(chk[0].email);
        this.isErr = false;
      }
    } catch (error) {
    console.log(' — Error is handled gracefully: ', error.name);
    this.isErr = true;
    this.logError = 'Please try again';
    }
    }

  logout() {
    this.dataService.userLogout();
  }


  ngOnInit() {
  }

}

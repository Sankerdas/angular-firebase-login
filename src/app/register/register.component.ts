import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regsterFrm = this.dataService.registerForm;

  regiser() {
    if (this.regsterFrm.valid) {
      this.dataService.registerData(this.regsterFrm.value);
    } else {
      console.log('not valid');
    }

  }

  constructor(public  dataService: DataService) { }

  ngOnInit() {
  }

}

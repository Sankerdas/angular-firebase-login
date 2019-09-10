import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  profiles: any;
  getUser: any;

  getProfile() {
    this.dataservice.fetchFromDb('/profiles').
    subscribe( res => {
       this.profiles = res; });
  }

  ngOnInit() {
    this.getProfile();
  }

}

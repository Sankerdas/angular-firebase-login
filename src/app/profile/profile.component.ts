import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  profile: any;
  getProfile() {
    this.dataservice.fetchProfData('/profiles').subscribe( res => (this.profile = res) );
  }

  ngOnInit() {
    this.getProfile();
  }

}

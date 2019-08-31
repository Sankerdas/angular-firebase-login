import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // firebase

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor( private fb: FormBuilder, private db: AngularFireDatabase ) { }

  private profPath = '/profiles'; // firebase collection name (Realtime database)

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    status: [true],
  });

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  registerData(data) {
  const dataObj = this.db.database.ref(this.profPath);
  dataObj.push(data);
  console.log('Data pushed into firebase');
  }

}

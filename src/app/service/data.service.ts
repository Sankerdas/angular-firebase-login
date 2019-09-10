import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // firebase
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor( private fb: FormBuilder, private db: AngularFireDatabase, private localStr: LocalStorageService ) { }

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

  registerData(data) { // insert into db
  const dataObj = this.db.database.ref(this.profPath);
  dataObj.push(data);
  console.log('Data pushed into firebase');
  }

  fetchFromDb(dbPath): Observable<any[]> { // fetch data from db
    const dbData = this.db.list(dbPath).valueChanges();
    // const dbData = this.db.list(dbPath).snapshotChanges();
    return dbData;
  }

  userLogin(lgnDta) {
    const em = lgnDta.email;
    this.localStr.store('mcqUser', em);
  }

  userLogout() {
    this.localStr.clear('mcqUser');
  }

}

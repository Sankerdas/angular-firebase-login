import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // firebase
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor( private fb: FormBuilder, private db: AngularFireDatabase, private localStorage: LocalStorageService ) { }

  private profPath = '/profiles'; // firebase collection name (Realtime database)
  public fndUsr: Observable<any[]>;
  public mtchPwd: any;

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
    // const  em = 's@gmail.com';
    // const psw = 'a';
    const em = lgnDta.email;
    const psw = lgnDta.password;
    const fndEmail = this.db.list('profiles', ref => (
    ref.orderByChild('email').equalTo(em))).valueChanges();
    fndEmail.subscribe(res => {
      this.mtchPwd = res;
    });
    return  this.errorWithCatch(this.mtchPwd, psw);
  }

  errorWithCatch(chk, pass) {
    try {
      if (chk.length === 1) {
        if (chk[0].password === pass) {
          return 'match';
        } else {
          return 'notmatch';
        }
      }
    } catch (error) {
    console.log(' —> Error is handled gracefully: ', error.name);
    return 'err';
    }

    }

  userLogout() {
    this.localStorage.clear('mcqz');
  }

}

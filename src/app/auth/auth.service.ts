import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe( (fbUser) => {
      console.log(fbUser);
      
    });
  }

  crearUsuario(nombre: string, email: string, password: string, password2: string) {
    if (password === password2) {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((data: any) => {
          
          const user: User = {
            uid: data.user.uid,
            nombre: nombre,
            email: data.user.email
          };

          this.afDB.doc(`${user.uid}/usuario`)
              .set(user)
              .then( () => {
                this.router.navigate(['/']);
              });
        })
        .catch(error => {
          Swal.fire('Error en el registro', error.message, 'error');
        });
    }
  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire('Error en el login', error.message, 'error');
      })
  }

  logout() {
    this.router.navigate(['/login']);
    this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => {
        if(fbUser === null) {
          this.router.navigate(['/login']);
        }
        return fbUser !== null;
      })
    )

  }
}

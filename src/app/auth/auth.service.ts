import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import * as fromUI from '../shared/ui.reducer';
import { activarLoading, desactivarLoading } from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<fromUI.State>) { }

  initAuthListener(): void {
    this.auth.authState.subscribe((fbUser) => {
      console.log(fbUser);

    });
  }

  crearUsuario(nombre: string, email: string, password: string, password2: string): void {
    if (password === password2) {
      this.store.dispatch(activarLoading());
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((data: any) => {

          const user: User = {
            uid: data.user.uid,
            nombre,
            email: data.user.email
          };

          this.afDB.doc(`${user.uid}/usuario`)
            .set(user)
            .then(() => {
              this.router.navigate(['/']);
              this.store.dispatch(desactivarLoading());
            });
        })
        .catch(error => {
          this.store.dispatch(desactivarLoading());
          Swal.fire('Error en el registro', error.message, 'error');
        });
    }
  }

  login(email: string, password: string): void {
    this.store.dispatch(activarLoading());
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch(desactivarLoading());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(desactivarLoading());
        Swal.fire('Error en el login', error.message, 'error');
      });
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigate(['/login']);
        }
        return fbUser !== null;
      })
    );

  }
}

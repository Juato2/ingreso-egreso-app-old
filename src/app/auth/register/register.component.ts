import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from 'src/app/shared/ui.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  cargando: boolean;
  subscription: Subscription;

  constructor(public authService: AuthService,
              public store: Store<State>) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store.subscribe(ui => this.cargando = ui.isLoading);
  }

  onSubmit(data: any): void {
    this.authService.crearUsuario(data.nombre, data.email, data.password, data.password2);
  }
}

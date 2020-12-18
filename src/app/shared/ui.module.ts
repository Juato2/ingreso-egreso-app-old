import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromUI from './ui.reducer';



@NgModule({
  imports: [
    StoreModule.forFeature(fromUI.uiFeatureKey, fromUI.reducer)
  ]
})
export class UiModule { }

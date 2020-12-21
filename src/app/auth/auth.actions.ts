import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const setUser = createAction(
    '[Auth] Set user...',
    props<{ user: User }>()
);

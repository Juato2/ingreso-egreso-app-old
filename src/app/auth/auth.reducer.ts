import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user: User;
}

export const initialState: AuthState = {
    user: null
};

const authReducer = createReducer(
    initialState,
    on(authActions.setUser, (state, {user}) => ({ user: {...user} })),
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
    return authReducer(state, action);
}

export const authFeatureKey = 'auth';

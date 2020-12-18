// import * as fromUI from './ui.actions';

// export interface State {
//     isLoading: boolean;
// }

// const initState: State = {
//     isLoading: false
// };

// export function uiReducer(state = initState, action: fromUI.acciones): State {
//     switch (action.type) {
//         case fromUI.ACTIVAR_LOADING:
//             return { isLoading: true };
//         case fromUI.DESACTIVAR_LOADING:
//             return { isLoading: false };

//         default:
//             return state;
//     }

// }
import { Action, createReducer, on } from '@ngrx/store';
import * as uiActions from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false
};

const uiReducer = createReducer(
    initialState,
    on(uiActions.activarLoading, state => ({ isLoading: true })),
    on(uiActions.desactivarLoading, state => ({ isLoading: false })),
);

export function reducer(state: State | undefined, action: Action): State {
    return uiReducer(state, action);
}

export const uiFeatureKey = 'ui';

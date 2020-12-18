// import { Action } from '@ngrx/store';

// export const ACTIVAR_LOADING = '[UI Loading] Cargando...';
// export const DESACTIVAR_LOADING = '[UI Loading] Fin de carga';

// export class ActivarLodingAction implements Action {
//     readonly type = ACTIVAR_LOADING;
// }

// export class DesactivarLodingAction implements Action {
//     readonly type = DESACTIVAR_LOADING;
// }

// export type acciones = ActivarLodingAction | DesactivarLodingAction;
import { createAction } from '@ngrx/store';

export const activarLoading = createAction('[UI Loading] Cargando...');
export const desactivarLoading = createAction('[UI Loading] Fin de carga');

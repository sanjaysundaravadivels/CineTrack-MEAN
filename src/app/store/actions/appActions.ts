import { createAction, props } from '@ngrx/store';
export const ACTION_LOGOUT = createAction('LOGOUT');
export const ACTION_LOGIN = createAction('LOGIN', props<{ user: object }>());

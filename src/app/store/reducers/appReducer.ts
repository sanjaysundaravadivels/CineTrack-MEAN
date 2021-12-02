import { createReducer, on } from '@ngrx/store';
import { ACTION_LOGOUT, ACTION_LOGIN } from '../actions/appActions';
export interface appReducerState {
  login: boolean;
  user?: object;
}
const initialState: appReducerState = {
  login: false,
  user: {},
};
const _reducer = createReducer(
  initialState,
  on(ACTION_LOGOUT, (state) => {
    return {
      ...state,
      login: false,
      user: {},
    };
  }),
  on(ACTION_LOGIN, (state, { user }) => {
    return {
      ...state,
      user: user,
      login: true,
    };
  })
);
export function reducer(state: any, action: any) {
  return _reducer(state, action);
}

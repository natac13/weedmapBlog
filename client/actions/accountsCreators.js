import { createAction } from 'redux-actions';
import { TOGGLE_CREATE_ACCOUNT, DELETE_ACCOUNT } from '../constants';
export const toggleCreateAccount = createAction(TOGGLE_CREATE_ACCOUNT);
export const deleteAccount = createAction(DELETE_ACCOUNT);

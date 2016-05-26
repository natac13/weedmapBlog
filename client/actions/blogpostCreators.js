import { createAction } from 'redux-actions';

import {
  BLOGPOST_ADD,
  BLOGPOST_DELETE,
  BLOGPOST_UPDATE,
} from '../constants/';

export const blogpostAdd = createAction(BLOGPOST_ADD);
export const blogpostDelete = createAction(BLOGPOST_DELETE);
export const blogpostUpdate = createAction(BLOGPOST_UPDATE);

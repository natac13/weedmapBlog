import { createAction } from 'redux-actions';

import {
  BLOGPOST_ADD,
  BLOGPOST_DELETE,
} from '../constants/';

export const blogpostAdd = createAction(BLOGPOST_ADD);
export const blogpostDelete = createAction(BLOGPOST_DELETE);

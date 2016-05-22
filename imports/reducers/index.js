import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import blogpost from './blogpost.js';

const rootReducer = combineReducers(Object.assign(
  {},
  {
    blogpost,
    form: formReducer,
  },
));

export default rootReducer;

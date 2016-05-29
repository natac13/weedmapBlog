import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';


import blogpost from './blogpost.js';
import accounts from './accounts.js';

const rootReducer = combineReducers(Object.assign(
  {},
  {
    blogpost,
    accounts,
    form: formReducer,
    routing: routerReducer,
  },
));

export default rootReducer;

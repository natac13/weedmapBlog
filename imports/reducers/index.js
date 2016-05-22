import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';


import blogpost from './blogpost.js';

const rootReducer = combineReducers(Object.assign(
  {},
  {
    blogpost,
    form: formReducer,
    routing: routerReducer,
  },
));

export default rootReducer;

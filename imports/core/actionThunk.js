import { curry } from 'ramda';

const actionThunk = curry(function actionThunk(fn, param1, event) {
  event.preventDefault();
  return fn(param1);
});

export default actionThunk;

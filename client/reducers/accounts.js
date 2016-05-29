import { TOGGLE_CREATE_ACCOUNT } from '../constants/';

const initialState = { createAccount: false };

function accounts(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CREATE_ACCOUNT:
      return {
        ...state,
        createAccount: !state.createAccount,
      };
    default:
      return state;
  }
}

export default accounts;

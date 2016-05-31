import { TOGGLE_CREATE_ACCOUNT, DELETE_ACCOUNT } from '../constants/';
import { bindReactiveData } from 'meteoredux';
import { Meteor } from 'meteor/meteor';


const initialState = {
  createAccount: false,
  currentUser: undefined,
};

function accounts(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CREATE_ACCOUNT:
      return {
        ...state,
        createAccount: !state.createAccount,
      };
    case DELETE_ACCOUNT:
      console.log(action.payload)
      Meteor.users.remove(action.payload);
      return state;
    default:
      return state;
  }
}

// think about handling login and logout here instead of in the component Login

function reactiveData() {
  return { currentUser: Meteor.user() };
}

export default bindReactiveData(accounts, reactiveData);

import React, { PropTypes } from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper/';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { reduxForm, reset } from 'redux-form';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as ActionCreators from '../../actions/';

import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

const ACCOUNTS_FORM = 'ACCOUNTS_FORM';
const fields = ['username', 'email', 'password', 'passwordAgain'];

import style from './style.scss';

function Login(props) {
  console.log('Accounts from meteor/accounts-password');
  console.log(Accounts);
  const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  console.log(props)

  const {
    fields: {
      username,
      email,
      password,
      passwordAgain,
    },
    onSubmitLogin,
    onSubmitCreateAccount,
    handleSubmit,
    submitting,
    _error,
    logout,
    actions: { toggleCreateAccount },
    accounts: { createAccount },
  } = props;

  const userId = Meteor.user();
  console.log(userId);
  console.log(!!userId);
  const onSubmit = createAccount ? onSubmitCreateAccount : onSubmitLogin;

  return (
    <div>
      <header>
        <h1>
          Login to your account.
        </h1>
      </header>
        <AccountsUIWrapper />
        <form
          role="form"
          className={style.loginForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Username"
            type="text"
            required
            floating={false}
            {...username}
          />
          {createAccount &&
            <Input
              label="Email"
              type="email"
              required
              floating={false}
              {...email}
            />
          }
          <Input
            label="Password"
            type="password"
            required
            floating={false}
            {...password}
          />
          {createAccount &&
            <Input
              label="Re-enter Password"
              type="password"
              required
              floating={false}
              {...passwordAgain}
            />
          }
          <Button
            type="submit"
            label={createAccount ? 'Create Account' : 'Login'}
            disabled={submitting}
          />
          {!!userId &&
            <Button
              type="button"
              label="Logout"
              disabled={submitting}
              onClick={logout}
            />
          }
          {!userId && !createAccount &&
            <Button
              type="button"
              label="Create Account"
              disabled={submitting}
              onClick={toggleCreateAccount}
            />
          }
        </form>
    </div>

  );
}

function onSubmitLogin(values, dispatch) {
  return new Promise((resolve, reject) => {
    const { username, password } = values;
    const loginCB = (error) => {
      if (error) {
        return reject({ _error: error });
      }
      return setTimeout(() => {
        dispatch(reset(ACCOUNTS_FORM));
        dispatch(ActionCreators.push('/'));
        return resolve();
      }, 750);
    };
    return Meteor.loginWithPassword(username, password, loginCB);
  });
}

function onSubmitCreateAccount(values, dispatch) {
  return new Promise((resolve, reject) => {
    const { username, email, password, passwordAgain } = values;
    if (!password === passwordAgain) {
      return reject({ _error: 'Passwords do not match' });
    }
    if (!password.length >= 8) {
      return reject({ _error: 'Password is not long enough' });
    }
    const data = { username, email, password };
    const createUserCB = (error) => {
      if (error) {
        reject({ _error: error });
      }
      dispatch(ActionCreators.push('/'));
      dispatch(ActionCreators.toggleCreateAccount());
      dispatch(reset(ACCOUNTS_FORM));
      return resolve();
    };
    return Accounts.createUser(data, createUserCB);
  });
}

function logout() {
  return Meteor.logout((error) => {
    if (error) { throw error; }
  });
}

function mapStateToProps(state, props) {
  return { accounts: state.accounts };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: ACCOUNTS_FORM,
    fields,
  }),
  withProps({ onSubmitLogin, onSubmitCreateAccount, logout }),
)(Login);

import React, { PropTypes } from 'react';
import { AccountForm, AccountStatus } from 'meteor/alt:react-accounts-unstyled';
import AccountsUIWrapper from '../AccountsUIWrapper/';



function Login() {

  return (
    <div>
      <header>
        <h1>
          Login to your account.
        </h1>
      </header>
        <AccountsUIWrapper />
        <AccountStatus />
        <AccountForm showClose="true" />
    </div>

  );
}

export default Login;

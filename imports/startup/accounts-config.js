import { AltAccounts } from 'meteor/alt:react-accounts-unstyled';

AltAccounts.config = {
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
  text: {
    logInStatus: 'Sign Up',
    logOutStatus: 'Log Out',

    oauthPasswordSeparator: 'OR',

    userNameField: 'Username',
    userNameOrEmailField: 'Username / Email',
    emailField: 'Email',
    optionalEmailField: 'Email (Optional)',
    passwordField: 'Password',
    passwordField2: 'Retype Password',

    logInButton: 'Sign In',
    createAccountButton: 'Create New Account',
    sendEmailButton: 'Send Email',
    okButton: 'OK',

    logInLink: 'Sign In',
    createAccountLink: 'Create New Account',
    forgotPasswordLink: 'Forgot Password',
    closeLink: 'Close',
  },
};

import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
});

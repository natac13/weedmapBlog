import React from 'react';
import { Router, Route } from 'react-router';
import { Meteor } from 'meteor/meteor';

import App from '../ui/App.jsx';
import BlogForm from '../ui/BlogForm/';
import Login from '../ui/Login/';
import BlogpostList from '../ui/BlogpostList/';

function requireAuth(nextState, replace) {
  console.log('whatNow')
  console.log(Meteor)
  if (!Meteor.user()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/new-entry" component={BlogForm} onEnter={requireAuth} />
      <Route path="/login" component={Login} />
      <Route path="blogposts" component={BlogpostList} />
    </Router>
  );
}

import React from 'react';
import { Router, Route } from 'react-router';
import { Meteor } from 'meteor/meteor';

import App from '../components/App.jsx';
import BlogForm from '../components/BlogForm/';
import Login from '../components/Login/';
import BlogpostList from '../components/BlogpostList/';

function requireAuth(nextState, replace) {
  console.log('whatNow')
  console.log(Meteor)
  if (!Meteor.user()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
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

import React from 'react';
import { Router, Route } from 'react-router';
import { Meteor } from 'meteor/meteor';


import App from '../containers/App/';

import BlogForm from '../components/BlogForm/';
import Login from '../components/Login/';
import BlogpostList from '../components/BlogpostList/';
import BlogpostView from '../components/BlogpostView/';

function requireAuth(nextState, replace) {
  if (!Meteor.user()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

// get withProps to extend the currentUser to every component by wrapping it here...???

export default function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/new-entry" component={BlogForm} onEnter={requireAuth} />
      <Route path="/accounts" component={Login} />
      <Route path="/blogposts" component={BlogpostList} />
      <Route path="/blogpost/:id" component={BlogpostView} />
      <Route path="/blogpost/:id/update" component={BlogForm} onEnter={requireAuth} />
    </Router>
  );
}

import React from 'react';
import { Router, Route } from 'react-router';
import { Meteor } from 'meteor/meteor';

import withProps from 'recompose/withProps';
const withCurrentUserProp = withProps({ currentUser: Meteor.user() });

import App from '../components/App.jsx';
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
      <Route path="/login" component={Login} />
      <Route path="/blogposts" component={BlogpostList} />
      <Route path="/blogpost/:id" component={withCurrentUserProp(BlogpostView)} />
    </Router>
  );
}

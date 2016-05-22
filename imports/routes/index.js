import React from 'react';
import { Router, Route } from 'react-router';

import App from '../ui/App.jsx';
import BlogForm from '../ui/BlogForm/BlogForm.jsx';

export default function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/new-entry" component={BlogForm} />
    </Router>
  );
}

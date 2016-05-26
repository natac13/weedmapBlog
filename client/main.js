import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connectToMeteor } from 'meteoredux';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createRoutes from './routes/';

Meteor.subscribe('blogposts');

import configureStore from './store/configureStore.js';

import '../imports/startup/accounts-config.js';
import './stylesheets/setup.scss';

const store = configureStore();
connectToMeteor(store);

const history = syncHistoryWithStore(browserHistory, store);


Meteor.startup(() => {
  const rootElement = document.getElementById('render-target');
  render(
    <Provider store={store}>
      {createRoutes(history)}
    </Provider>,
    rootElement
  );
});

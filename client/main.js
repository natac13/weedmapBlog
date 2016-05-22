import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connectToMeteor } from 'meteoredux';

Meteor.subscribe('blogposts');

import configureStore from '../imports/store/configureStore.js';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';

const store = configureStore();
connectToMeteor(store);

Meteor.startup(() => {
  const rootElement = document.getElementById('render-target');
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
});

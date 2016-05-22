import React, { PropTypes } from 'react';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withReducer from 'recompose/withReducer';
import { connect } from 'react-redux';

import { Meteor } from 'meteor/meteor';

import Blogposts from '../api/Blogposts.js';

function App(props) {
  return (
    <div className="app-wrapper">
      {/* Header */}
      {/* Nav with latest post, user, login */}
      {/* latestPost */}
      {/* Footer*/}
    </div>
  );
}

//  Redux Connection
function mapStateToProps(state) {
  console.log(state);
  return {
    form: state.form,
  };
}

export default compose(
  connect(mapStateToProps),
  withProps({ currentUser: Meteor.user() })
)(App);


import React, { PropTypes } from 'react';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Meteor } from 'meteor/meteor';

import * as ActionCreators from '../actions/';


function App(props) {
  console.log(props)
  return (
    <div className="app-wrapper">
      Welcome, to WeedMaps Blogs
      <nav>
        <ul>
          <li onClick={() => props.actions.push('/new-entry')}>
            New Entry
          </li>
          <li onClick={() => props.actions.push('/login')}>
            Login
          </li>
          <li onClick={() => props.actions.push('/blogposts')}>
            Blogposts
          </li>
        </ul>
      </nav>
      {/* Header */}
      {/* Nav with latest post, user, login */}
      {/* latestPost */}
      {/* Footer*/}
    </div>
  );
}

//  Redux Connection
function mapStateToProps(state) {
  return {
    form: state.form,
    blogposts: state.blogpost,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps({ currentUser: Meteor.user() }),
  pure,
)(App);


import React, { PropTypes } from 'react';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Meteor } from 'meteor/meteor';
import { Button } from 'react-toolbox/lib/button';

import * as ActionCreators from '../../actions/';

import style from './style.scss';

function App(props) {
  const {
    goTo,
    actions: { push },
  } = props;
  const currentUser = Meteor.userId();
  return (
    <div className="app-wrapper">
      <header className={style.header}>
        <h1 className={style.title}>Blogging App Using Meteor!</h1>
        <h3 className={style.name}>By: Sean Campbell</h3>
      </header>
      <div className={style.nav}>
          <Button
            label="New Entry"
            flat
            primary
            className={style.link}
            onClick={goTo(push, '/new-entry')}
          />
          <Button
            label="Blogposts"
            flat
            primary
            className={style.link}
            onClick={goTo(push, '/blogposts')}
          />
          <Button
            label={!!currentUser ? 'Logout' : 'Login' }
            flat
            primary
            className={style.link}
            onClick={goTo(push, '/accounts')}
          />
      </div>
      {/* latestPost */}
      {/* Footer*/}
    </div>
  );
}

App.propTypes = {
  goTo: PropTypes.func,
  actions: PropTypes.object,
};

const goTo = (pushAction, route) => (event) => {
  event.preventDefault();
  return pushAction(route);
};


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
  withProps({ goTo }),
  pure,
)(App);


import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import { bindActionCreators } from 'redux';
import { find, propEq, curry } from 'ramda';
import { Meteor } from 'meteor/meteor';

import { Button } from 'react-toolbox/lib/button';

import * as ActionCreators from '../../actions/';


import style from './style.scss';

function BlogpostView(props) {
  const userId = Meteor.userId();
  const {
    blogpost,
    actions: { push, blogpostDelete },
    actionThunk,
    deleteThunk,
  } = props;

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <h1 className={style.title}>{blogpost.title}</h1>
      </header>
      <article className={style.entry}>
        <p className={style.blog}>{blogpost.entry}</p>
      </article>
        {!!userId && userId === blogpost.owner && (
          <footer className={style.footer}>
            <Button
              type="button"
              label="Update Blog"
              onClick={actionThunk(push, `/blogpost/${blogpost._id}/update`)}
            />
            <Button
              type="button"
              label="Delete Blog"
              onClick={deleteThunk(blogpostDelete, blogpost._id, push, '/blogposts')}
            />
          </footer>
        )}
    </div>
  );
}

BlogpostView.propTypes = {
  params: PropTypes.object,
  blogpost: PropTypes.object,
  actions: PropTypes.object,
  actionThunk: PropTypes.func,
  deleteThunk: PropTypes.func,
};

const actionThunk = curry(function actionThunk(fn, param1, event) {
  event.preventDefault();
  return fn(param1);
});

const deleteThunk = curry(function deleteThunk(deleteFn, id, goTo, location, event) {
  event.preventDefault();
  deleteFn(id);
  setTimeout(() => goTo(location), 500);
  return true;
});


function mapStateToProps(state, props) {
  return {
    blogpost: find(propEq('_id', props.params.id))(state.blogpost.blogposts),
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
  withProps({ actionThunk, deleteThunk }),
  pure,
)(BlogpostView);

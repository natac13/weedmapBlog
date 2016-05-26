import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import pure from 'recompose/pure';
import { Meteor } from 'meteor/meteor';
import { find, propEq, curry } from 'ramda';
import { blogpostAdd, blogpostUpdate, push } from '../../actions/';

import fileToURI from '../../../imports/core/fileToURI.js';

import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import style from './style.scss';

const FORM_NAME = 'blogEntry';

function BlogForm(props) {
  console.log(props);
  const {
    fields: { title, entry, image },
    handleSubmit,
    onSubmit,
    submitting,
    location: { pathname },
  } = props;

  const isUpdate = !!pathname && pathname.includes('update');

  return (
    <form
      acceptCharset="utf-8"
      className={style.wrapper}
      onSubmit={handleSubmit(onSubmit(isUpdate))}
    >
      <fieldset>
        <legend>
          New Blog Post
        </legend>
        <Input
          id="title"
          type="text"
          label="Title"
          maxLength={120}
          required
          error={!!props.error && props.error.includes('Title') && props.error}
          {...title}
        />

        <Input
          id="blog-entry"
          type="text"
          multiline
          rows={10}
          label="Blog Entry"
          hint="A long time ago, In a galaxy far far away..."
          required
          error={!!props.error && props.error.includes('Blog') && props.error}
          {...entry}
          value={entry.value || ''}
        />

        <Input
          id="img"
          type="file"
          value={null}
          className={style.input}
          onChange={props.fileToURI(image)}
        />
      </fieldset>
      <Button
        flat
        disabled={submitting}
        type="submit"
        label="Post!"
        icon="file_upload"
        neutral={false}
      />
    </form>
  );
}

BlogForm.propTypes = {
  fields: PropTypes.object.isRequried,
  handleSubmit: PropTypes.func.isRequried,
  onSubmit: PropTypes.func.isRequired,
  fileToURI: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  location: PropTypes.object,
};

const onSubmit = curry(function onSubmit(update, values, dispatch) {
  return new Promise((resolve, reject) => {
    const {
      _id,
      title,
      entry,
      image,
    } = values;
    if (title.length < 5) {
      reject({ _error: 'Title too short. Minimum 5 characters.' });
    } else if (entry.length < 150) {
      reject({ _error: 'Blog Entry too short: Minimum 150 characters.' });
    } else {
      const currentUser = Meteor.user();
      const blogpostData = {
        title,
        entry,
        image,
        createdAt: new Date(),
        owner: currentUser._id,
        username: currentUser.username,
      };
      const updatedData = {
        _id,
        title,
        entry,
        image,
        updatedAt: new Date(),
      };
      // if update false then add the post otherwise update.
      dispatch(!update ? blogpostAdd(blogpostData) : blogpostUpdate(updatedData));
      setTimeout(() => dispatch(push('/blogposts')), 500);
      dispatch(reset(FORM_NAME));
      resolve();
    }
  });
});

function initializeValues(state, props) {
  if (location.pathname.includes('update')) {
    const { blogpost: { blogposts } } = state;
    const id = props.params.id;
    return { initialValues: find(propEq('_id', id))(blogposts) };
  }
  return null;
}

export default compose(
  reduxForm({
    form: FORM_NAME,
    fields: ['title', 'entry', 'image', '_id'],
  },
  initializeValues,
  ),
  withProps({ onSubmit, fileToURI }),
  pure,
)(BlogForm);

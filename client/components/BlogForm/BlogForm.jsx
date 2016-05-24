import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import pure from 'recompose/pure';
import { Meteor } from 'meteor/meteor';
import { curry } from 'ramda';
import {
  blogpostAdd,
  blogpostDelete,
} from '../../actions/';

import fileToUri from '../../../imports/core/fileToURI.js';

import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import style from './style.scss';

const FORM_NAME = 'blogEntry';

function BlogForm(props) {
  console.log(props)
  const {
    fields: { title, entry, image },
    handleSubmit,
    onSubmit,
    submitting,
  } = props;

  return (
    <form
      acceptCharset="utf-8"
      className={style.wrapper}
      onSubmit={handleSubmit(onSubmit)}
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
          multiline={true}
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
          onChange={props.fileToUri(image)}
        />
      </fieldset>
      <Button
        flat
        disabled={submitting}
        type="submit"
        label="Post!"
        neutral={false}
      />
    </form>
  );
}

BlogForm.propTypes = {
  fields: PropTypes.object.isRequried,
  handleSubmit: PropTypes.func.isRequried,
  onSubmit: PropTypes.func.isRequired,
};

function onSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    const {
      title,
      entry,
      image,
    } = values;
    if (title.length < 5) {
      reject({ _error: 'Title too short. Minimum 5 characters.' })
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
      dispatch(blogpostAdd(blogpostData));
      dispatch(reset(FORM_NAME));
      resolve();
    }
  });
}


export default compose(
  reduxForm({
    form: FORM_NAME,
    fields: ['title', 'entry', 'image'],
  }),
  withProps({ onSubmit, fileToUri }),
  pure,
)(BlogForm);

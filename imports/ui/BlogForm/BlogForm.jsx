import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import pure from 'recompose/pure';
import { Meteor } from 'meteor/meteor';


function BlogForm(props) {
  console.log(props);
  const {
    fields: { title, entry },
    handleSubmit,
    onSubmit,
  } = props;

  return (
    <form
      acceptCharset="utf-8"
      className="blog-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset>
        <legend>
          New Blog Post
        </legend>
        <p>
          <label htmlFor="blog-title">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            id="blog-title"
            {...title}
          />
        </p>
        <p>
          <label htmlFor="blog-entry">
            Blog entry
          </label>
          <textarea
            id="blog-entry"
            {...entry}
            value={entry.value || ''}
          />
        </p>

      </fieldset>
      <button type="submit">
        Submit
      </button>
    </form>
  );
}

BlogForm.propTypes = {
  fields: PropTypes.object.isRequried,
  handleSubmit: PropTypes.func.isRequried,
  onSubmit: PropTypes.func.isRequired,
};

function onSubmit(values) {
  console.log(values);
  return new Promise((resolve, reject) => {
    resolve()
  });
}

export default compose(
  reduxForm({
    form: 'blogEntry',
    fields: ['title', 'entry'],
  }),
  withProps({ onSubmit }),
  pure,
)(BlogForm);

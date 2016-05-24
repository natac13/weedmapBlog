import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import { bindActionCreators } from 'redux';
import { find, propEq } from 'ramda';

import * as ActionCreators from '../../actions/';


import style from './style.scss';

function BlogpostView(props) {
  console.log(props);
  const {
    params,
    blogpost,
  } = props;
  return (
    <div className={style.wrapper}>
        {params.id}
        <p>{blogpost.title}</p>
        <p>{blogpost.entry}</p>
    </div>
  )
}


function mapStateToProps(state, props) {
  console.log(state, props);
  return {
    blogpost: find(propEq('_id', props.params.id))(state.blogpost.blogposts)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(BlogpostView);
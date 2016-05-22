import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
// import withProps from 'recompose/withProps';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/';

function BlogpostList(props) {
  const {
    blogposts,
  } = props;

  const list = blogposts.map((blogpost) => (
    <li>
      <p> {blogpost.title} </p>
      <p> {blogpost.entry} </p>
    </li>
  ));
  return (
    <ul>
      {list}
    </ul>
  );
}

BlogpostList.propTypes = {
  blogposts: PropTypes.array.isRequired,
};

//  Redux Connection
function mapStateToProps(state) {
  return {
    blogposts: state.blogpost.blogposts,
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
  // withProps({ currentUser: Meteor.user() }),
  pure,
)(BlogpostList);

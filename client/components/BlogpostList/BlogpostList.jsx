import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from '../../actions/';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


import style from './style.scss';


function BlogpostList(props) {
  const {
    blogposts,
    createDescription,
  } = props;

  const list = blogposts.map((blogpost) => (
    <Card style={{width: '350px'}}>
      <CardTitle
        title={blogpost.username}
      />
      <CardMedia
        aspectRatio="wide"
        image={blogpost.image || "https://placeimg.com/800/450/nature"}
      />
      <CardTitle
        title={blogpost.title}
      />
      <CardText>{createDescription(blogpost.entry)}</CardText>
      <CardActions>
        {/*<Button label="Action 1" />
        <Button label="Action 2" />*/}
      </CardActions>
    </Card>
  ));
  return (
    <div className={style.wrapper}>
      {list}
    </div>
  );
}

BlogpostList.propTypes = {
  blogposts: PropTypes.array.isRequired,
};

function createDescription(text = '') {
  return text.slice(0, 249);
}

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
  pure,
  withProps({ createDescription }),
  connect(mapStateToProps, mapDispatchToProps),
)(BlogpostList);

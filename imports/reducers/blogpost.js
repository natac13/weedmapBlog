import {
  BLOGPOST_ADD,
  BLOGPOST_DELETE,
  // BLOGPOST_UPDATE,
  // BLOGPOST_PRIVATE,
} from '../constants/';
import { bindReactiveData } from 'meteoredux';

import Blogposts from '../api/Blogposts.js';
const initialState = {};

function blogpost(state = initialState, action) {
  switch (action.type) {
    case BLOGPOST_ADD:
      Blogposts.insert(action.payload);
      return state;
    case BLOGPOST_DELETE:
      Blogposts.remove(action.payload.id);
      return state;
    default:
      return state;
  }
}

function reactiveData() {
  return {
    blogposts: Blogposts.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}
export default bindReactiveData(blogpost, reactiveData);

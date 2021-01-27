import { SET_AUTHOR, AUTHOR_CREATED } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case SET_AUTHOR:
      return action.payload;
    case AUTHOR_CREATED:
      return action.payload;
    default:
      return state;
  }
}

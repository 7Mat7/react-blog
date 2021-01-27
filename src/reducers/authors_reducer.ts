import { FETCH_AUTHORS, FETCH_AUTHOR } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_AUTHORS:
      return action.payload;
    case FETCH_AUTHOR:
      return [action.payload];
    default:
      return state;
  }
}

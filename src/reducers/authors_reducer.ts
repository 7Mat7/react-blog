import { FETCH_AUTHORS, SET_AUTHOR } from '../actions';

export default function(state = [], action: any) {
  switch (action.type) {
    case FETCH_AUTHORS:
      return action.payload;
    case SET_AUTHOR:
      return [action.payload];
    default:
      return state;
  }
}

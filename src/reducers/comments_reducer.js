import { COMMENT_CREATED, FETCH_COMMENTS } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload
    case COMMENT_CREATED:
      return [...state,
        action.payload
        ];
    default:
      return state;
  }
}

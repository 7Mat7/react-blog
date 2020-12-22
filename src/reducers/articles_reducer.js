import { FETCH_ARTICLES, FETCH_ARTICLE, DELETE_ARTICLE, ARTICLE_UPDATED } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return action.payload;
    case ARTICLE_UPDATED:
      return state.map(item => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
    case DELETE_ARTICLE:
      return state.filter(article => article !== action.payload);
    default:
      return state;
  }
}

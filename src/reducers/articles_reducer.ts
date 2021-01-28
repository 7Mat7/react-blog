import { AnyAction } from 'redux';
import { FETCH_ARTICLES, FETCH_ARTICLE, DELETE_ARTICLE, ARTICLE_UPDATED } from '../actions';
import { ArticleType } from '../interface';

export default function(state: ArticleType[] = [], action: AnyAction) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {...state};
    case FETCH_ARTICLE:
      return [action.payload];
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

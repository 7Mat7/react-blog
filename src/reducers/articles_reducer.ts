import { AnyAction } from 'redux';
import { FETCH_ARTICLES, FETCH_ARTICLE, DELETE_ARTICLE, ARTICLE_UPDATED } from '../actions';

import { ArticleType } from '../interface';
import {initialState} from '../index';

export default function(state: ArticleType[] = [], action: AnyAction) {
  switch (action.type) {
    case FETCH_ARTICLES:
      console.log("I'm in reducer");
      return {...state};
    case 'ARTICLES_RECEIVED':
      console.log("I've been through Saga");
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

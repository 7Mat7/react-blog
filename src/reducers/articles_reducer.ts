import { AnyAction } from "redux";
import { FETCH_ARTICLES, FETCH_ARTICLE, DELETE_ARTICLE, ARTICLE_UPDATED } from "../actions";
import { ARTICLES_RECEIVED } from "../saga/saga";
import { ArticleType } from "../interface";

export default function (state: ArticleType[] = [], action: AnyAction): any {
  switch (action.type) {
    case FETCH_ARTICLES:
      console.log("I'm in reducer");
      return action.payload;
    case ARTICLES_RECEIVED:
      console.log("I've been through Saga");
      return { ...state };
    case FETCH_ARTICLE:
      return [action.payload];
    case ARTICLE_UPDATED:
      return state.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
    case DELETE_ARTICLE:
      return state.filter((article) => article !== action.payload);
    default:
      return state;
  }
}

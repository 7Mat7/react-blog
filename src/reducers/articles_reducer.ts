import { AnyAction } from "redux";
import { RECEIVE_ARTICLE, DELETE_ARTICLE, RECEIVE_ARTICLES, RECEIVE_ARTICLE_UPDATE } from "../actions/action_types";
import { ArticleType } from "../interface";

export default function (state: ArticleType[] = [], action: AnyAction): any {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      console.log(action.data);
      return action.data;
    case RECEIVE_ARTICLE:
      console.log(action.data);
      return [action.data];
    case RECEIVE_ARTICLE_UPDATE:
      return state.map((item) => {
        if (item.id === action.data.id) return action.data;
        return item;
      });
    case DELETE_ARTICLE:
      return state.filter((article) => article !== action.payload);
    default:
      return state;
  }
}

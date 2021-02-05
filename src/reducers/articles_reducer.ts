import { AnyAction } from "redux";
import {
  ARTICLE_CREATE_RESPONSE,
  RECEIVE_ARTICLE,
  RECEIVE_ARTICLES,
  RECEIVE_ARTICLE_UPDATE,
} from "../actions/action_types";
import { ArticleType } from "../interface";

export default function (state: ArticleType[] = [], action: AnyAction): any {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return action.data;
    case RECEIVE_ARTICLE:
      return [action.data];
    case RECEIVE_ARTICLE_UPDATE:
      return state.map((item) => {
        if (item.id === action.data.id) return action.data;
        return item;
      });
    case ARTICLE_CREATE_RESPONSE:
      return state;
  }
  return state;
}

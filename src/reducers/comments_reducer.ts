import { AnyAction } from "redux";
import { COMMENT_CREATED, FETCH_COMMENTS } from "../actions";
import { CommentType } from "../interface";

export default function (state: CommentType[] = [], action: AnyAction) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    case COMMENT_CREATED:
      return [...state, action.payload];
    default:
      return state;
  }
}

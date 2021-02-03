import { AnyAction } from "redux";
import { COMMENT_CREATED, RECEIVE_COMMENTS } from "../actions";
import { CommentType } from "../interface";

export default function (state: CommentType[] = [], action: AnyAction): any {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.payload;
    case COMMENT_CREATED:
      return [action.payload];
    default:
      return state;
  }
}

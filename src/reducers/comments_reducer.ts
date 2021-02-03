import { AnyAction } from "redux";
import { RECEIVE_NEW_COMMENT } from "../actions";
import { CommentType } from "../interface";

export default function (state: CommentType[] = [], action: AnyAction): any {
  switch (action.type) {
    case RECEIVE_NEW_COMMENT:
      return [...state, action.data];
    default:
      return state;
  }
}

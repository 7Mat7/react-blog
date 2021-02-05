import { AnyAction } from "redux";
import { SET_AUTHOR, AUTHOR_CREATED } from "../actions/action_types";

export default function (state = [], action: AnyAction): any {
  switch (action.type) {
    case SET_AUTHOR:
      return action.payload;
    case AUTHOR_CREATED:
      return action.payload;
    default:
      return state;
  }
}

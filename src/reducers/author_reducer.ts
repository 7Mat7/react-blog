import { AnyAction } from "redux";
import { SET_AUTHOR, RECEIVE_NEW_AUTHOR } from "../actions/action_types";

export default function (state = [], action: AnyAction): any {
  switch (action.type) {
    case SET_AUTHOR:
      return action.payload;
    case RECEIVE_NEW_AUTHOR:
      return action.data;
    default:
      return state;
  }
}

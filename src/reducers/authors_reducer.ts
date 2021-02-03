import { AnyAction } from "redux";
import { RECEIVE_AUTHORS } from "../actions";
import { AuthorType } from "../interface";

export default function (state: AuthorType[] = [], action: AnyAction): any {
  switch (action.type) {
    case RECEIVE_AUTHORS:
      return action.data;
    default:
      return state;
  }
}

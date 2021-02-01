import "regenerator-runtime/runtime";
export const ARTICLES_RECEIVED = "ARTICLES_RECEIVED";

import { takeLatest, all } from "redux-saga/effects";

function* getArticles() {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", "I'm in Saga !");
}

function* actionWatcher() {
  yield takeLatest("FETCH_ARTICLES", getArticles);
}

export function* rootSaga() {
  yield all([actionWatcher()]);
}

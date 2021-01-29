import "regenerator-runtime/runtime";
import { AnyAction } from "redux";
import { AxiosResponse } from "axios";

import { takeLatest, put, call, all } from "redux-saga/effects";

function* getArticles() {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
  "I'm in Saga !");
  const json = yield fetch(`http://localhost:8000/api/articles?page=1`)
  .then(response => response.json());
  console.log(json);

  yield put({ type: 'ARTICLES_RECEIVED', json: json });
}

function* actionWatcher() {
  yield takeLatest('FETCH_ARTICLES', getArticles);
}

export function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}

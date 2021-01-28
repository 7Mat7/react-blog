import { AnyAction } from "redux";
import { AxiosResponse } from "axios";

import { takeLatest, put, all } from "redux-saga/effects";

function* getArticles() {
    const promise = yield fetch(`http://localhost:8000/api/articles?page=1`)
    .then(response => response.json(), );

    yield put({ type: 'ARTICLES_RECEIVED', json: promise, })
  return {
    type: FETCH_ARTICLES,
  }
}

export function* rootSaga() {
    yield takeLatest("FETCH_ARTICLES", getArticles());
};

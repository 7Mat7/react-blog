import "regenerator-runtime/runtime";
import { fetchArticle, fetchArticles, fetchAuthors, fetchComments } from "../api/api";

import { call, put, all, takeEvery, takeLatest } from "redux-saga/effects";
import {
  REQUEST_ARTICLES,
  receiveArticles,
  REQUEST_AUTHORS,
  receiveAuthors,
  REQUEST_ARTICLE,
  REQUEST_COMMENTS,
  receiveComments,
} from "../actions";
import { AnyAction } from "redux";

function* getArticles() {
  try {
    const data = yield call(fetchArticles);
    yield put(receiveArticles(data));
  } catch (e) {
    console.log(e);
  }
}

function* getArticle(action: AnyAction) {
  try {
    const data = yield call(fetchArticle, action);
    yield put(receiveArticles(data));
  } catch (e) {
    console.log(e);
  }
}

function* getAuthors() {
  try {
    const data = yield call(fetchAuthors);
    yield put(receiveAuthors(data));
  } catch (e) {
    console.log(e);
  }
}

function* getComments(action: AnyAction) {
  try {
    const data = yield call(fetchComments, action);
    yield put(receiveComments(data));
  } catch (e) {
    console.log(e);
  }
}

function* actionWatcher() {
  yield takeLatest(REQUEST_AUTHORS, getAuthors);
  yield takeLatest(REQUEST_ARTICLES, getArticles);
  yield takeEvery(REQUEST_ARTICLE, getArticle);
  yield takeEvery(REQUEST_COMMENTS, getComments);
}

export default function* rootSaga(): any {
  yield all([actionWatcher()]);
}

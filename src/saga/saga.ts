import "regenerator-runtime/runtime";
import { fetchArticle, fetchArticles, fetchAuthors, postNewComment } from "../api/api";

import { call, put, all, takeEvery, takeLatest } from "redux-saga/effects";
import {
  REQUEST_ARTICLES,
  receiveArticles,
  REQUEST_AUTHORS,
  receiveAuthors,
  REQUEST_ARTICLE,
  REQUEST_CREATE_COMMENT,
  receiveNewComment,
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

function* newCommentRequest(action: AnyAction) {
  try {
    const data = yield call(postNewComment, action);
    yield put(receiveNewComment(data));
  } catch (e) {
    console.log(e);
  }
}

function* actionWatcher() {
  yield takeLatest(REQUEST_AUTHORS, getAuthors);
  yield takeLatest(REQUEST_ARTICLES, getArticles);
  yield takeEvery(REQUEST_ARTICLE, getArticle);
  yield takeEvery(REQUEST_CREATE_COMMENT, newCommentRequest);
}

export default function* rootSaga(): any {
  yield all([actionWatcher()]);
}

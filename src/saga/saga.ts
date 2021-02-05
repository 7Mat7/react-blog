import "regenerator-runtime/runtime";
import { fetchArticle, fetchArticles, fetchAuthors, fetchComments, postNewComment, putArticle } from "../api/api";

import { call, put, all, takeEvery, takeLatest } from "redux-saga/effects";
import {
  receiveArticles,
  receiveAuthors,
  receiveNewComment,
  receiveComments,
  receiveUpdateArticle,
} from "../actions/index";
import {
  REQUEST_ARTICLES,
  REQUEST_AUTHORS,
  REQUEST_ARTICLE,
  REQUEST_CREATE_COMMENT,
  REQUEST_COMMENTS,
  REQUEST_ARTICLE_UPDATE,
} from "../actions/action_types";
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

function* getComments(action: AnyAction) {
  try {
    const data = yield call(fetchComments, action.iri);
    yield put(receiveComments(data));
  } catch (e) {
    console.log(e);
  }
}

function* getArticleUpdate(action: AnyAction) {
  try {
    const data = yield call(putArticle, action);
    yield put(receiveUpdateArticle(data));
  } catch (e) {
    console.log(e);
  }
}

function* actionWatcher() {
  yield takeLatest(REQUEST_AUTHORS, getAuthors);
  yield takeLatest(REQUEST_ARTICLES, getArticles);
  yield takeEvery(REQUEST_ARTICLE, getArticle);
  yield takeEvery(REQUEST_CREATE_COMMENT, newCommentRequest);
  yield takeEvery(REQUEST_COMMENTS, getComments);
  yield takeEvery(REQUEST_ARTICLE_UPDATE, getArticleUpdate);
}

export default function* rootSaga(): any {
  yield all([actionWatcher()]);
}

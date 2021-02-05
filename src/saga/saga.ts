import "regenerator-runtime/runtime";
import * as api from "../api/api";
import * as dispatch from "../actions/index";
import * as action from "../actions/action_types";

import { call, put, all, takeEvery, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";

function* getArticles() {
  try {
    const data = yield call(api.fetchArticles);
    yield put(dispatch.receiveArticles(data));
  } catch (e) {
    console.log(e);
  }
}

function* getArticle(action: AnyAction) {
  try {
    const data = yield call(api.fetchArticle, action);
    yield put(dispatch.receiveArticles(data));
  } catch (e) {
    console.log(e);
  }
}

function* getAuthors() {
  try {
    const data = yield call(api.fetchAuthors);
    yield put(dispatch.receiveAuthors(data));
  } catch (e) {
    console.log(e);
  }
}

function* newCommentRequest(action: AnyAction) {
  try {
    const data = yield call(api.postNewComment, action);
    yield put(dispatch.receiveNewComment(data));
  } catch (e) {
    console.log(e);
  }
}

function* getComments(action: AnyAction) {
  try {
    const data = yield call(api.fetchComments, action.iri);
    yield put(dispatch.receiveComments(data));
  } catch (e) {
    console.log(e);
  }
}

function* getArticleUpdate(action: AnyAction) {
  try {
    const data = yield call(api.putArticle, action);
    yield put(dispatch.receiveUpdateArticle(data));
  } catch (e) {
    console.log(e);
  }
}

function* newAuthorRequest(action: AnyAction) {
  try {
    const data = yield call(api.postAuthor, action);
    yield put(dispatch.receiveNewAuthor(data));
  } catch (e) {
    console.log(e);
  }
}

function* deleteArticleRequest(action: AnyAction) {
  try {
    yield call(api.destroyArticle, action);
    yield put(dispatch.articleDeleteResponse());
  } catch (e) {
    console.log(e);
  }
}

function* newArticleRequest(action: AnyAction) {
  try {
    const data = yield call(api.postArticle, action);
    yield put(dispatch.articleCreateResponse(data));
  } catch (e) {
    console.log(e);
  }
}

function* actionWatcher() {
  yield takeLatest(action.REQUEST_AUTHORS, getAuthors);
  yield takeLatest(action.REQUEST_ARTICLES, getArticles);
  yield takeEvery(action.REQUEST_ARTICLE, getArticle);
  yield takeEvery(action.REQUEST_CREATE_COMMENT, newCommentRequest);
  yield takeEvery(action.REQUEST_COMMENTS, getComments);
  yield takeEvery(action.REQUEST_ARTICLE_UPDATE, getArticleUpdate);
  yield takeEvery(action.AUTHOR_CREATE_REQUEST, newAuthorRequest);
  yield takeEvery(action.ARTICLE_DELETE_REQUEST, deleteArticleRequest);
  yield takeEvery(action.ARTICLE_CREATE_REQUEST, newArticleRequest);
}

export default function* rootSaga(): any {
  yield all([actionWatcher()]);
}

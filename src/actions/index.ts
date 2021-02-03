export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const REQUEST_ARTICLE = "REQUEST_ARTICLE";
export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";

export const REQUEST_AUTHORS = "REQUEST_AUTHORS";
export const RECEIVE_AUTHORS = "RECEIVE_AUTHORS";

export const ARTICLE_CREATED = "ARTICLE_CREATED";
export const ARTICLE_UPDATED = "ARTICLE_UPDATED";
export const DELETE_ARTICLE = "DELETE_ARTICLE";

export const SET_AUTHOR = "SET_AUTHOR";
export const AUTHOR_CREATED = "AUTHOR_CREATED";

export const REQUEST_CREATE_COMMENT = "REQUEST_CREATE_COMMENT";
export const RECEIVE_NEW_COMMENT = "RECEIVE_NEW_COMMENT";

import { AnyAction } from "redux";
import { ArticleType, AuthorType } from "../interface";

//Articles Actions
export const requestArticles = (): AnyAction => ({ type: REQUEST_ARTICLES });
export const receiveArticles = (data: any): AnyAction => ({ data, type: RECEIVE_ARTICLES });

export const requestArticle = (iri: string): AnyAction => ({ iri, type: REQUEST_ARTICLE });
export const receiveArticle = (data: any): AnyAction => ({ data, type: RECEIVE_ARTICLE });

// Authors Actions
export const requestAuthors = (): AnyAction => ({ type: REQUEST_AUTHORS });
export const receiveAuthors = (data: any): AnyAction => ({ type: RECEIVE_AUTHORS, data });

// Comments Actions
export const requestCreateComment = (body: string): AnyAction => ({ body, type: REQUEST_CREATE_COMMENT });
export const receiveNewComment = (data: any): AnyAction => ({ data, type: RECEIVE_NEW_COMMENT });

export function updateArticle(body: ArticleType, id: number, callback: (values: ArticleType) => void): AnyAction {
  const resp = fetch(`http://localhost:8000/api/articles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/ld+json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(callback);

  return {
    type: ARTICLE_UPDATED,
    payload: resp,
  };
}

export function deleteArticle(article: ArticleType, callback: () => void): AnyAction {
  fetch(`http://localhost:8000/api/articles/${article.id}`, { method: "DELETE" })
    .then((r) => r.text())
    .then(callback);

  return {
    type: DELETE_ARTICLE,
    payload: article,
  };
}

export function setAuthor(author: AuthorType): AnyAction {
  return {
    type: SET_AUTHOR,
    payload: author,
  };
}

export function createAuthor(body: Partial<AuthorType>, callback: (values: any) => void): AnyAction {
  const request = fetch("http://localhost:8000/api/authors", {
    method: "POST",
    headers: { "Content-Type": "application/ld+json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(callback);
  return {
    type: AUTHOR_CREATED,
    payload: request,
  };
}

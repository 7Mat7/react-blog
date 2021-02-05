import * as action from "./action_types";

import { AnyAction } from "redux";
import { history } from "..";
import { ArticleType, AuthorType } from "../interface";

//Articles Actions
export const requestArticles = (): AnyAction => ({ type: action.REQUEST_ARTICLES });
export const receiveArticles = (data: any): AnyAction => ({ data, type: action.RECEIVE_ARTICLES });

export const requestArticle = (iri: string): AnyAction => ({ iri, type: action.REQUEST_ARTICLE });
export const receiveArticle = (data: any): AnyAction => ({ data, type: action.RECEIVE_ARTICLE });

export const requestArticleUpdate = (data: ArticleType, id: number): AnyAction => ({
  data,
  id,
  type: action.REQUEST_ARTICLE_UPDATE,
});

export const receiveUpdateArticle = (data: any): AnyAction => {
  history.push("/articles");
  return {
    data,
    type: action.RECEIVE_ARTICLE_UPDATE,
  };
};

// Authors Actions
export const requestAuthors = (): AnyAction => ({ type: action.REQUEST_AUTHORS });
export const receiveAuthors = (data: any): AnyAction => ({ type: action.RECEIVE_AUTHORS, data });

// Comments Actions
export const requestCreateComment = (body: string): AnyAction => ({ body, type: action.REQUEST_CREATE_COMMENT });
export const receiveNewComment = (data: any): AnyAction => ({ data, type: action.RECEIVE_NEW_COMMENT });

export const requestComments = (iri: string): AnyAction => ({ iri, type: action.REQUEST_COMMENTS });
export const receiveComments = (data: any): AnyAction => ({ data, type: action.RECEIVE_COMMENTS });

export function deleteArticle(article: ArticleType, callback: () => void): AnyAction {
  fetch(`http://localhost:8000/api/articles/${article.id}`, { method: "DELETE" })
    .then((r) => r.text())
    .then(callback);

  return {
    type: action.DELETE_ARTICLE,
    payload: article,
  };
}

export function setAuthor(author: AuthorType): AnyAction {
  return {
    type: action.SET_AUTHOR,
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
  console.log(request);
  return {
    type: action.AUTHOR_CREATED,
    payload: request,
  };
}

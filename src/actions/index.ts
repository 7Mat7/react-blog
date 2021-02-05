import * as action from "./action_types";

import { AnyAction } from "redux";
import { history } from "..";
import { ArticleType, AuthorType } from "../interface";

//Articles Actions
export const requestArticles = (): AnyAction => ({ type: action.REQUEST_ARTICLES });
export const receiveArticles = (data: any): AnyAction => ({ data, type: action.RECEIVE_ARTICLES });

export const requestArticle = (iri: string): AnyAction => ({ iri, type: action.REQUEST_ARTICLE });
export const receiveArticle = (data: any): AnyAction => ({ data, type: action.RECEIVE_ARTICLE });

export const articleCreateRequest = (values: any): AnyAction => ({ values, type: action.ARTICLE_CREATE_REQUEST });
export const articleCreateResponse = (data: any): AnyAction => {
  history.push("/articles");
  return {
    data,
    type: action.ARTICLE_CREATE_RESPONSE,
  };
};

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

export const articleDeleteRequest = (article: ArticleType): AnyAction => {
  return {
    article,
    type: action.ARTICLE_DELETE_REQUEST,
  };
};
export const articleDeleteResponse = (): AnyAction => {
  history.push("/articles");
  return {
    type: action.ARTICLE_DELETE_RESPONSE,
  };
};

// Authors Actions
export const requestAuthors = (): AnyAction => ({ type: action.REQUEST_AUTHORS });
export const receiveAuthors = (data: any): AnyAction => ({ type: action.RECEIVE_AUTHORS, data });

export const authorCreateRequest = (body: Partial<AuthorType>, callback: (author: any) => any): AnyAction => ({
  type: action.AUTHOR_CREATE_REQUEST,
  callback,
  body,
});
export const receiveNewAuthor = (data: any): AnyAction => {
  history.push("/articles");
  return {
    data,
    type: action.RECEIVE_NEW_AUTHOR,
  };
};

// Comments Actions
export const requestCreateComment = (body: string): AnyAction => ({ body, type: action.REQUEST_CREATE_COMMENT });
export const receiveNewComment = (data: any): AnyAction => ({ data, type: action.RECEIVE_NEW_COMMENT });

export const requestComments = (iri: string): AnyAction => ({ iri, type: action.REQUEST_COMMENTS });
export const receiveComments = (data: any): AnyAction => ({ data, type: action.RECEIVE_COMMENTS });

export function setAuthor(author: AuthorType): AnyAction {
  return {
    type: action.SET_AUTHOR,
    payload: author,
  };
}

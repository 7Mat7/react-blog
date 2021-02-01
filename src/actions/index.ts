export const FETCH_ARTICLES = "FETCH_ARTICLES";
export const ARTICLE_CREATED = "ARTICLE_CREATED";
export const ARTICLE_UPDATED = "ARTICLE_UPDATED";
export const FETCH_ARTICLE = "FETCH_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";

export const SET_AUTHOR = "SET_AUTHOR";
export const AUTHOR_CREATED = "AUTHOR_CREATED";
export const FETCH_AUTHORS = "FETCH_AUTHORS";

export const COMMENT_CREATED = "COMMENT_CREATED";
export const FETCH_COMMENTS = "FETCH_COMMENTS";

import axios from "axios";
import { AnyAction } from "redux";
import { ArticleType, AuthorType } from "../interface";

export function fetchArticles(): AnyAction {
  const request = fetch("http://localhost:8000/api/articles?page=1", {
    method: "GET",
    headers: { accept: "application/json" },
  }).then((response) => response.json());

  return {
    type: FETCH_ARTICLES,
    payload: request,
  };
}

export function createArticle(body: string, callback: (values: any) => void): AnyAction {
  const request = fetch("http://localhost:8000/api/articles", {
    method: "POST",
    headers: { "Content-Type": "application/ld+json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(callback);

  return {
    type: ARTICLE_CREATED,
    payload: request,
  };
}

export const fetchArticle = async (iri: string): Promise<any> => {
  try {
    const resp = await axios.get(`http://localhost:8000${iri}`);
    return {
      type: FETCH_ARTICLE,
      payload: resp.data,
    };
  } catch (err) {
    console.error(err);
  }
};

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

export function deleteArticle(article: ArticleType, callback: () => void) {
  fetch(`http://localhost:8000/api/articles/${article.id}`, { method: "DELETE" })
    .then((r) => r.text())
    .then(callback);

  return {
    type: DELETE_ARTICLE,
    payload: article,
  };
}

export const fetchAuthors = (): AnyAction => {
  const promise = fetch("http://localhost:8000/api/authors?page=1", {
    method: "GET",
    headers: { accept: "application/json" },
  }).then((response) => response.json());

  return {
    type: FETCH_AUTHORS,
    payload: promise,
  };
};

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
  ("Mateo's");
  return {
    type: AUTHOR_CREATED,
    payload: request,
  };
}

export function createComment(body: string) {
  const request = fetch("http://localhost:8000/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/ld+json" },
    body: JSON.stringify(body),
  }).then((response) => response.json());

  return {
    type: COMMENT_CREATED,
    payload: request,
  };
}

export function fetchComments(id: number) {
  const promise = axios
    .get(`http://localhost:8000/api/articles/${id}/comments`)
    .then((response) => console.log(response.data));
  return {
    type: FETCH_COMMENTS,
    payload: promise,
  };
}

import { AnyAction } from "redux";

export const fetchArticles = async (): Promise<any> => {
  try {
    const response = await fetch("http://localhost:8000/api/articles");
    const data = await response.json();
    return data["hydra:member"];
  } catch (e) {
    console.log(e);
  }
};

export const fetchArticle = async (action: AnyAction): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:8000${action.iri}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchAuthors = async (): Promise<any> => {
  try {
    const response = await fetch("http://localhost:8000/api/authors?page=1");
    const data = await response.json();
    return data["hydra:member"];
  } catch (e) {
    console.log(e);
  }
};

export const postNewComment = async (action: AnyAction): Promise<any> => {
  try {
    const response = await fetch("http://localhost:8000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/ld+json" },
      body: JSON.stringify(action.body),
    }).then((response) => response.json());
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const fetchComments = async (action: AnyAction): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:8000/api/articles/${action}/comments?page=1`);
    const data = await response.json();
    return data["hydra:member"];
  } catch (e) {
    console.log(e);
  }
};

export const putArticle = async (action: AnyAction): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:8000/api/articles/${action.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/ld+json" },
      body: JSON.stringify(action.data),
    }).then((response) => response.json());
    console.log(action);
    return response;
  } catch (e) {
    console.log(e);
  }
};

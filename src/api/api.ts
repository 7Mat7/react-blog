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

export const fetchComments = async (action: AnyAction): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:8000/api/articles/${action.id}/comments`);
    const data = response.json;
    return data;
  } catch (e) {
    console.log(e);
  }
};

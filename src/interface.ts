export interface State {
    articles: ArticleType;
    authors: AuthorType;
  }

export interface AuthorType {
    id: number;
    firstname: string;
    lastname: string;
    articles: ArticleType[];
}

export interface CommentType {
    id: number;
    content: string;
}

export interface ArticleType {
    id: number;
    content: string;
    title: string;
    author: AuthorType;
    comments: CommentType[];
}

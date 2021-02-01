export interface State {
  articles: ArticleType[];
  authors: AuthorType[];
  author: AuthorType | null;
  comments: CommentType[];
  article: ArticleType | null;
  comment: CommentType | null;
}

export interface AuthorType {
  id: string;
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

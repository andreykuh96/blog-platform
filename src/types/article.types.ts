import { IUser } from './user.types';

export interface IAuthor {
  username: string;
  image: string;
  following: boolean;
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

export interface ResponseAllArticles {
  articles: IArticle[];
  articlesCount: number;
}

export interface ResponseAnArticle {
  article: IArticle;
}

export interface ICreateArticleRequest {
  article?: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}

export interface ICreateArticleResponse {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList: string[];
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };
}

import { LODING_ARTICLE, GET_ARTICLE, LODING_ARTICLES, GET_ARTICLES } from "../constants";
import { Article } from "../interfaces/Article";


export interface Action {
  type: string;
  articles: Article[];
}

export interface ArticleAction {
  type: string;
  article: Article;
}

export interface LoadingAction {
  type: string;
  loading: boolean;
}

export interface LoadingArticleAction {
  type: string;
  loading: boolean;
}

export function articles(state: Article[] = [], action: Action): Article[] {
  if (action.type === GET_ARTICLES) {
    return action.articles;
  }
  return state;
}

export function loadingArticles(state: boolean = false, action: LoadingAction): boolean {
  if (action.type === LODING_ARTICLES) {
    return action.loading;
  }
  return state;
}

export function article(state: Article = {}, action: ArticleAction): Article {
  if (action.type === GET_ARTICLE) {
    return action.article;
  }
  return state;
}

export function loadingArticle(state: boolean = false, action: LoadingArticleAction): boolean {
  if (action.type === LODING_ARTICLE) {
    return action.loading;
  }
  return state;
}

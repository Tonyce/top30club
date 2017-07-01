import { LODING_ARTICLES, GET_ARTICLES, LODING_ARTICLE, GET_ARTICLE } from "../constants";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getArticlesApi, getArticleApi } from "../apis/articles";
// import { initEditor } from "./editor";

import { State } from "../interfaces/State";
import { Article } from "../interfaces/Article";
import { Action, ArticleAction } from "../reducers/article";
// import { Article } from "../reducers/editor";

function _change(articles: Article[]): Action {
  return {
    type: GET_ARTICLES,
    articles
  };
}

function _loading(loading: boolean): {type: string, loading: boolean} {
  return {
    type: LODING_ARTICLES,
    loading
  };
}

function _changeArticle(article: Article): ArticleAction {
  return {
    type: GET_ARTICLE,
    article
  };
}

function _loadingArticle(loading: boolean): {type: string, loading: boolean} {
  return {
    type: LODING_ARTICLE,
    loading
  };
}

export function getAllArticleAction(type: string = ""): ThunkAction<void, State, {}> {
  return (dispatch: Dispatch<State>, getState: Function) => {
    let oldArticles: Article[] = getState().articles;
    let oldLength: number = oldArticles.length;
    if (type === "init" && oldLength > 0) { return; }
    let time: string = "";
    let tmp: Article = null;
    if (type === "more") {
      tmp = oldArticles[oldLength - 1]; time = tmp && tmp.time;
    }
    dispatch(_loading(true));
    getArticlesApi(time, type).then((resp: Response) => {
      // resp status check
      return resp.json();
    }).then((body: any) => {return body.newer; }).then((articles: Article[]) => {
      let newArtcles: Article[] = [...oldArticles, ...articles];
      dispatch(_change(newArtcles));
      dispatch(_loading(false));
    }).catch((err: Error) => { console.log(err); dispatch(_loading(false)); });
  };
}

export function getArticleAction(id: string): ThunkAction<void, State, {}> {
  return (dispatch: Dispatch<State>, getState: Function) => {
    dispatch(_loadingArticle(true));
    getArticleApi(id).then((resp: Response) => {
      // resp status check
      return resp.json();
    }).then((article: Article) => {
      dispatch(_changeArticle(article));
      dispatch(_loadingArticle(false));
    }).catch((err: Error) => { console.log(err); dispatch(_loading(false)); });
  };
}

/*
export function publishArticleAction(enable?: boolean): ThunkAction<void, State, {}> {
  return (dispatch: Dispatch<State>, getState: Function) => {
    let token: string = getState().loginStatus.token;
    let article: Article = getState().editor;
    article.enable = enable || false;
    publishArticleApi(article, token).then((resp: Response) => {
      // resp status check
      // 发布成功
      console.log("init...editor...");
      // dispatch(initEditor());
    }).catch((err: Error) => { console.log(err); });
  };
}
*/

// import fetch from 'fetch';
// import { checkStatus } from "./config";
import { headerHandler } from "./headerHandler";
import { Article, DataItem } from "../interfaces/Article";
/**
 * getArticle
 * GET
 * /api/articles/:id
 * response IEditor
 */

export function getArticleApi(id: string, token?: string): Promise<Response> {
  let path: string = `/api/articles/${id}`;
  let headers: {} = headerHandler(token);
  return window.fetch(path, {
    method: "GET",
    headers
  });
};

export function getArticlesApi(time: string = "", type: string = ""): Promise<Response> {
  let headers: {} = headerHandler();
  return window.fetch(`/api/articles?time=${time}&type=${type}`, {
    method: "GET",
    headers
  });
};


export function publishArticleApi(article: Article, token: string): Promise<Response> {
  let datas: DataItem[] = article.datas;
  let show: DataItem = findShow(datas);
  article.show = show;
  let headers: {} = headerHandler(token);
  let body: string = JSON.stringify(article);
  return window.fetch(`/api/articles`, {
    method: "POST",
    headers,
    body
  });
};

export function goodApi(inc: number, articleId: string, token: string): Promise<Response> {
  let headers: {} = headerHandler(token);
  return window.fetch(`/api/articles/${articleId}/good`, {
    body: JSON.stringify({ inc: inc }),
    method: "POST",
    headers,
  });
};

export function favoriteApi(inc: number, articleId: string, token: string): Promise<Response> {
  let headers: {} = headerHandler(token);
  return window.fetch(`/api/articles/${articleId}/favorite`, {
    body: JSON.stringify({ inc: inc }),
    method: "POST",
    headers,
  });
};

function findShow(datas: DataItem[]): DataItem {
  let show: DataItem = datas[0];
  for (let i: number = 0; i < datas.length; i++) {
    if (/photo|code/.test(datas[i].type)) {
      return datas[i];
    }
  }
  return show;
}
/**
 * getArticles
 * GET
 * /api/articles/:type [hot, recomment, new, '']
 * response 
 * {
 *     articles: IEditor[]
 * }
 */


// export const getArticleRef = (id: string) => {

// };

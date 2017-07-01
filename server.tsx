import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import * as React from "react";
import { match, useRouterHistory } from "react-router";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { RouterContext } from "react-router";
import { createMemoryHistory, useQueries } from "history";
import { History, HistoryQueries } from "history";

import { Reducer, Store } from "redux";
import { articles, loadingArticles, loadingArticle, article } from "./src/reducers/article";
import { createStore, combineReducers } from "redux";

import { createRoutes } from "./src/routes";

import { State } from "./src/interfaces/State";
// import { Article } from "./src/interfaces/Article";

import { apiMap } from "./serverApiMap";

const reducer: Reducer<State> = combineReducers<State>({
  article,
  articles,
  loadingArticle,
  loadingArticles,
});

const initialState: State = {
  article: {},
  articles: [],
  loadingArticle: false,
  loadingArticles: false,
};

const indexStr: string = fs.readFileSync(`./index.html`)
                           .toString("utf-8");

http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.end("");
    return;
  }
  let history: History & HistoryQueries = useRouterHistory(useQueries(createMemoryHistory))();
  let routes: JSX.Element = createRoutes(history);
  let location = history.createLocation(req.url);
  let key: string = location.pathname;
  let apiMapValue = apiMap(key);
  loadData(apiMapValue).then((parsedData: any) => {
    const initState: State = parsedData ?
          Object.assign({}, initialState, parsedData) :
          Object.assign({}, initialState);
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.log(error);
        res.statusCode = 500;
        res.end("err happed");
      }
      try {
        const store: Store<State> = createStore<State>(
          reducer,
          initState
        );
        const html: string = renderToString(
          <Provider store={store}>
            {<RouterContext {...renderProps} />}
          </Provider>
        );
        const _initialState: State = store.getState();
        // res.end(renderFullPage("html", ""));
        res.end(renderFullPage(html, _initialState));
      } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end("err happed");
      }
    });
  }).catch((err) => {
    res.statusCode = 500;
    res.end(err);
  });
}).listen(3039, () => {
  console.log("server started...");
});


function renderFullPage(html: string, initState: State): string {
  return indexStr.replace("{{html}}", html)
                 .replace("'{{initState}}'", JSON.stringify(initState));
}

function loadData(apiMapValue: any): Promise<any> {
  const host: string = "https://top30.club";
  const proxy = https;
  // const host: string = "http://server.render.io";
  if (!(apiMapValue && apiMapValue.path)) {
    return Promise.resolve();
  }

  const promise: Promise<any> = new Promise((reslove, reject) => {
    const apiUrl = `${host}${apiMapValue.path}`;
    // console.log(apiUrl);
    proxy.get(apiUrl, (resp: http.IncomingMessage) => {
      let rawData: string = "";
      resp.setEncoding("utf8");
      resp.on("data", (chunk) => rawData += chunk);
      resp.on("end", () => {
        try {
          let parsedData = JSON.parse(rawData);
          let key: string = apiMapValue.key;
          let value: string = apiMapValue.value;
          let data: any = {};
          data[key] = value ? parsedData[value] : parsedData;
          reslove(data);
        } catch (e) {
          reject(e);
        }
      });
      resp.on("error", (err) => {
        reject(err);
      });
    }).on("error", (e) => {
      console.log("err");
      reject(e);
    });
  });
  return promise;
}

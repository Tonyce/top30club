import * as React from "react";
import * as ReactDOM from "react-dom";
import { browserHistory } from "react-router";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Reducer, Middleware, Store } from "redux";
import { Provider } from "react-redux";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import { ReactRouterReduxHistory } from "react-router-redux";

import thunk from "redux-thunk";
import * as logger from "redux-logger";

import reducers from "./reducers";
import { Width } from "./interfaces/Width";
import { getWidth, WidthAction } from "./reducers/width";
import { WIDTH_CHANGE } from "./constants";
import { createRoutes } from "./routes";

import { State } from "./interfaces/State";

const reducer: Reducer<State> = combineReducers<State>({
  article: reducers.article,
  articles: reducers.articles,
  loadingArticle: reducers.loadingArticle,
  loadingArticles: reducers.loadingArticles,
  routing: routerReducer,
  width: reducers.width,
});

const isProduction: boolean = process.env.NODE_ENV === "production";
const middleware: Middleware[] = isProduction ? [thunk] : [thunk, logger()];

const initialState: State = (window as any).__INITIAL_STATE__;

// console.log(initialState);

const store: Store<State> = createStore<State>(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

const history: ReactRouterReduxHistory = syncHistoryWithStore(browserHistory, store);

window.addEventListener("resize", () => {
  let width: Width = getWidth();
  const action: WidthAction = { type: WIDTH_CHANGE, width };
  store.dispatch(action);
});

window.addEventListener("scroll", () => {
  const headerDom: HTMLElement = document.getElementsByTagName("header")[0];
  const top: number = window.pageYOffset || document.documentElement.scrollTop;
  if (headerDom) {
    headerDom.style.boxShadow = top > 100 ?
        "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.14)" :
        "";
  }
});

ReactDOM.render(
  <Provider store={store}>
    {createRoutes(history)}
  </Provider>,
  document.getElementById("app")
);

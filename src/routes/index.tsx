import * as React from "react";
import { Router, Route, IndexRoute } from "react-router";
// import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import { History, HistoryQueries } from "history";

import { MainPage } from "../page/MainPage";
import { InfoPage } from "../page/InfoPage";

import MainContainer from "../containers/MainContainer";
// import InfoContainer from "../containers/InfoContainer";
import { About } from "../components";


// const HomeWrapper extends React.createClass({
//   render: function () {
//     return (
//         <Comments myprop="myvalue" />
//     );
//   }
// });



export const createRoutes = function(history: History & HistoryQueries): JSX.Element {
  return (
    <Router history={history} >
      <Route path="/" component={MainPage}>
        <IndexRoute component={MainContainer} />
        <Route path="/about" component={About} />
      </Route>
      <Route path="/info/:id" component={InfoPage} />
    </Router>
  );
};


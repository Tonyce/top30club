import * as React from "react";
import {MapStateToProps, connect } from "react-redux";
// import * as ReactTransitionGroup from "react-addons-transition-group";

import { State } from "../interfaces/State";
import { Article } from "../interfaces/Article";
import { Width } from "../interfaces/Width";

import { Main } from "../components/Main";
// import ArticleCard from "../../components/card/ArticleCard";
// import { State } from "../../reducers";
// import { Article } from "../../reducers/editor";
import { getAllArticleAction } from "../actions/articleAction";

// import { Spinner } from "../../icon/Icons";

interface ConnectedProps {
  // width: number;
  // pWidth: number;
  width: Width;
  articles: Article[];
  loadingArticles: boolean;
  getAllArticleAction?(type: string): void;
}


export class MainContainer extends React.Component<ConnectedProps, {}> {

  public componentDidMount(): void {
    // console.log("MainContainer");
    const articles: Article[] = this.props.articles;
    if (articles && articles.length > 0) {
      return;
    }
    // console.log("getArticleApi");
    let { getAllArticleAction }: ConnectedProps = this.props;
    getAllArticleAction("init");
  }

  private getMore = (): void => {
    let { getAllArticleAction }: ConnectedProps = this.props;
    getAllArticleAction("more");
    // console.log("getMore");
  }

  public render(): JSX.Element {
    const { width, articles, loadingArticles }: ConnectedProps = this.props;
    // console.log(width);
    const mainPros = { width, articles };
    return (
      <Main {...mainPros}>
        <div className="loading-container">
          {loadingArticles ?
            "loading" :
            <button onClick={this.getMore.bind(this)}>More..</button>
          }
        </div>
      </Main>
    );
  }
}

const mapStateToProps: MapStateToProps<ConnectedProps, {}> = (state: State) => ({
  articles: state.articles,
  loadingArticles: state.loadingArticles,
  width: state.width,
  // pWidth: state.windowWidth.pWidth,
  // width: state.windowWidth.width,
});

export default connect(
  mapStateToProps,
  { getAllArticleAction }
)(MainContainer);

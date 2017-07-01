import * as React from "react";
import {MapStateToProps, connect } from "react-redux";

import { State } from "../interfaces/State";
import { Article } from "../interfaces/Article";
import { InfoView } from "../components/info";

import ArticleView from "../components/ArticleView";
import { getArticleAction } from "../actions/articleAction";
interface ConnectedProps {
  // width: number;
  // pWidth: number;
  article: Article;
  loadingArticle: boolean;
  getArticleAction?(id: string): void;
}

interface OwnProps {
  paramId: string;
}


export class InfoContainer extends React.Component<ConnectedProps & OwnProps, {}> {

  public componentWillMount(): void {
  }

  public componentDidMount(): void {
    window.scrollTo(0, 0);
    const { paramId, article, getArticleAction }: ConnectedProps & OwnProps = this.props;
    if (paramId !== article._id) {
      getArticleAction(paramId);
    }
    const thisDom: HTMLElement = document.getElementById("info");
    thisDom.style.minHeight = `${window.innerHeight - 60}px`;
    setTimeout(() => {
      thisDom.style.opacity = "1";
      // thisDom.style.display = "block";
    }, 300);
  }

  public render(): JSX.Element {
    const { article, loadingArticle }: ConnectedProps = this.props;
    return (
      <div className="article-container" id="info">
        <ArticleView data={article}/>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps> = (state: State) => ({
  article: state.article,
  loadingArticle: state.loadingArticle,
  // pWidth: state.windowWidth.pWidth,
  // width: state.windowWidth.width,
});

export default connect(
  mapStateToProps,
  { getArticleAction }
)(InfoContainer);

import * as React from "react";
import { Link } from "react-router";
import { findDOMNode } from "react-dom";
import { Article } from "../interfaces/Article";
import { Width } from "../interfaces/Width";
import { ArticleCard } from "./ArticleCard";

interface OwnProps {
  location?: ReactRouter.LocationDescriptor;
  router?: ReactRouter.Router;
  width: Width;
  articles: Article[];
  // loadingArticles: boolean;
}

export class Main extends React.Component<OwnProps, {}> {

  public componentDidMount(): void {
    const thisDom: HTMLElement = document.getElementById("main");
    thisDom.style.minHeight = `${window.innerHeight - 60}px`;
    setTimeout(() => {
      thisDom.style.opacity = "1";
    }, 300);
  }

  public render(): JSX.Element {
    const { width, articles }: OwnProps = this.props;
    const style = width ? {
      width: width.pWidth,
    } : {};
    return (
      <div className="main" id="main" style={style}>
        {articles.map((article: Article, index: number) => {
          return (
            <ArticleCard article={article} index={index} width={width} key={article._id}/>
          );
        })}
        {this.props.children}
      </div>
    );
  }
}


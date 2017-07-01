import * as React from "react";
import * as marked from "marked";
import { Link } from "react-router";

import { Article } from "../interfaces/Article";
import { Width } from "../interfaces/Width";

import { AuthorInfo } from "./AuthorInfo";
import { PhotoHeader, TextHeader, MarkdownHeader, CodeHeader } from "./ArticleCardHeaders";

interface OwnProps {
  article: Article;
  index: number;
  width: Width;
}

export class ArticleCard extends React.Component<OwnProps, {}> {

  public context: {
    router: ReactRouter.InjectedRouter
  };

  public static contextTypes: React.ValidationMap<any> = {
    router: React.PropTypes.object.isRequired
  };

  private articleInfo = (id: string) => {
    // alert(id);
    // console.log(this.props)
    this.context.router.push(`/info/${id}`);
  }

  public render(): JSX.Element {
    const { width, article, index }: OwnProps = this.props;
    const cellStyle = width ? {
      width: width.width - width.margin,
      height: (width.width - width.margin),
      margin: width.margin / 2
    } : {};
    let header: JSX.Element = null;
    const height: number = width ? (width.width - width.margin) * 0.618 : 0;
    const avgPardding: number = width ?
        ((width.width - width.margin) * 0.382 - (20 + 34 + 15)) / 4 : 0;
    const heightPx: string = `${height}px`;
    const avgParddingPx: string = `${avgPardding}px`;
    switch (article.show.type) {
      case "text":
        header = <TextHeader height={heightPx} content={article.show.content} />;
        break;
      case "code":
        header = <CodeHeader height={heightPx} code={article.show.code} />;
        break;
      case "photo":
        let showImage: string = article.show.src;
        header = <PhotoHeader height={heightPx} showImage={showImage} />;
        break;
      case "markdown":
        header = <MarkdownHeader height={heightPx} content={marked(article.show.content)} />;
        break;
      default:
        header = <div style={{ height: heightPx, overflow: "hidden", width: "100%", }} />;
    }
    let _id: string = article._id;
    return (
      <div className="article-cell" style={cellStyle} onClick={this.articleInfo.bind(this, _id)}>
        {header}
        <h3 className="title" style={{}}>
          <Link to={`/info/${_id}`}>
          {article.title}
          </Link>
        </h3>
        <AuthorInfo authorId={article.authorId}
                    avgParddingPx={avgParddingPx}
                    authorInfo={article.authorInfo}
                    time={article.time} />
        <div className="article-info" style={{}}>
          <i className="material-icons">favorite</i>
          <span>35</span>
          <i className="material-icons">thumb_up</i>
          <span>195</span>
          <span>阅读:</span>
          <span>809</span>
        </div>
      </div>
    );
  }
};

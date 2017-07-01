import * as React from "react";

import Label from "./views/Label";
import CodeView from "./views/CodeView";
import PhotoView from "./views/PhotoView";
import TextView from "./views/TextView";
import MarkdownView from "./views/MarkdownView";
import { AuthorInfo } from "./AuthorInfo";

// import AuthorInfo from "./AuthorInfo";

import { DataItem, Article } from "../interfaces/Article";

interface OwnProps {
  data: Article;
}

export default class ArticleView extends React.Component<OwnProps, {}> {
  public constructor() {
    super();
  }
  public render(): JSX.Element {
    let {data}: OwnProps = this.props;
    let { title, labels, authorId, authorInfo, time, datas }: Article = data;
    let dataElem: JSX.Element[] = datas && datas.map((item: DataItem, index: number) => {
      // key={`${data._id}-${index}`}/>;
      switch (item.type) {
        case "code":
          return <CodeView {...item} key={`${data._id}-${index}`}/>;
        case "markdown":
          return <MarkdownView {...item} key={`${data._id}-${index}`}/>;
        case "photo":
          return <PhotoView {...item} key={`${data._id}-${index}`}/>;
        default:
          return <TextView {...item} key={`${data._id}-${index}`}/>;
      }
    });
    return (
      <div className="article-info">
        <h1>{title}</h1>
        {/*<Label labels={labels}/>*/}
        <AuthorInfo authorId={authorId} authorInfo={authorInfo} time={time} isContent={true}/>
        {dataElem}
      </div>
    );
  }
}

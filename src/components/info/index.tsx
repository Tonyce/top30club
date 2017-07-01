import * as React from "react";
import { connect } from "react-redux";

import ArticleView from "../../components/ArticleView";
import { Article } from "../../interfaces/Article";


interface OwnState {
  content?: Article;
  isLoading?: boolean;
}

interface OwnProps {
  article: Article;
  // parent: any;
}

// interface ConnectedProps {
//   token?: string;
// }

export class InfoView extends React.Component<OwnProps, OwnState> {
  public title: string = "";
  public constructor() {
    super();
  }

  public componentDidMount(): void {
    // window.scrollTo(0, 0);
  }
  //   this.setState({ isLoading: true });
  //   let { id }: OwnProps = this.props;
  //   let { token }: ConnectedProps = this.props;
  //   getArticleApi(id, token).then((resp: Response) => {
  //     if (resp.status !== 200) { throw new Error(resp.statusText); }
  //     return resp.json();
  //   }).then((json: Article) => {
  //     this.props.parent.setState({title: json.title});
  //     if (json._id) { this.setState({ content: json, isLoading: false });
  //     } else { this.setState({ isLoading: false }); }
  //   }).catch((err: Error) => {
  //     console.error(err);
  //     this.setState({ isLoading: false });
  //   });
  // }

  public render(): JSX.Element {
    let article: Article = this.props.article;
    return (
      <ArticleView data={article}/>
    );
  }
}

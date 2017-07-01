import * as React from "react";

import { highlightBlock } from "highlight.js";
import * as marked from "marked";

import { DataItem } from "../../interfaces/Article";

interface OwnState {
  text: string;
}

export default class MarkdownView extends React.Component<DataItem, OwnState> {
  private markdownDom: HTMLElement = null;
  public constructor(props: DataItem) {
    super(props);
    this.state = {
      text: marked(props.content)
    };
  };

  public componentDidMount(): void {
    let codeArr: NodeListOf<Element> = this.markdownDom.getElementsByTagName("code");
    for (let i: number = 0; i < codeArr.length; i++) {
      let codeDom: Element = codeArr[i];
      highlightBlock(codeDom);
    }
  }

  public render(): JSX.Element {
    return (
      <div className="markdown-view view" ref={(r) => this.markdownDom = r} 
           dangerouslySetInnerHTML={{ __html: this.state.text }} />
    );
  }
}

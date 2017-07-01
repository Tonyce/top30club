import * as React from "react";

import { DataItem } from "../../interfaces/Article";

import * as hljs from "highlight.js";
const { highlightBlock }: {highlightBlock(block: Node): void} = hljs;

export default class CodeView extends React.Component<DataItem, {}> {
  private codeDom: HTMLElement = null;
  public componentDidMount(): void {
    highlightBlock(this.codeDom);
  }
  public render(): JSX.Element {
    let codeType: string = this.props.codeType && this.props.codeType.toLowerCase() || "";
    return (
      <div className="code-view view">
        <pre>
          <code className={codeType} ref={(r) => this.codeDom = r}>
          {this.props.code}
          </code>
        </pre>
        <div>
          {this.props.content}
        </div>
      </div>
    );
  }
}

import * as React from "react";
import { highlightBlock } from "highlight.js";

import { findDOMNode } from "react-dom";

interface PhotoHeaderProps {
  height: string;
  showImage: string;
}
export class PhotoHeader extends React.Component<PhotoHeaderProps, {}> {
  public render(): JSX.Element {
    const {showImage, height}: PhotoHeaderProps = this.props;
    const style: {} = {
      backgroundImage: `url("${showImage}")`,
      height: height,
    };
    return (
      <div style={style} className="article-cell-header"/>
    );
  }
}

interface CodeHeaderProps {
  height: string;
  code: string;
}
export class CodeHeader extends React.Component<CodeHeaderProps, {}> {
  public componentDidMount(): void {
    const codeDom: HTMLElement = findDOMNode(this).getElementsByTagName("code")[0];
    highlightBlock(codeDom);
  }
  public render(): JSX.Element {
    const { height, code }: CodeHeaderProps = this.props;
    let codeType: string = "javascript";
    return (
      <div style={{ height: height}} className="article-cell-header">
        <pre style={{ height: "100%" }}>
          <code className={codeType} >
            {code}
          </code>
        </pre>
      </div>
    );
  }
}

interface MarkdownHeaderProps {
  height: string;
  content: string;
}
export class MarkdownHeader extends React.Component<MarkdownHeaderProps, {}> {
  public componentDidMount(): void {
    let codeArr: NodeListOf<Element> = findDOMNode(this).getElementsByTagName("code");
    for (let i: number = 0; i < codeArr.length; i++) {
      let codeDom: Element = codeArr[i];
      highlightBlock(codeDom);
    }
  }
  public render(): JSX.Element {
    let { height, content }: MarkdownHeaderProps = this.props;
    let style: {} = {
      height: height,
    };
    return (
      <div style={style} className="article-cell-header">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

interface TextHeaderProps {
  height: string;
  content: string;
}
export class TextHeader extends React.Component<TextHeaderProps, {}> {
  public render(): JSX.Element {
    let { height, content }: TextHeaderProps = this.props;
    let style: {} = {
      height: height
    };

    return (
      <div style={style} className="article-cell-header">
        <p className="text">
          {content}
        </p>
      </div>
    );
  }
}

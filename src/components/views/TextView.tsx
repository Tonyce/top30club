import * as React from "react";
import { DataItem } from "../../interfaces/Article";

export default class TextView extends React.Component<DataItem, {}> {
  public constructor() {
    super();
  }
  public render(): JSX.Element {
    let contentArr: string[] = this.props.content.split("\n");
    let contentElem: JSX.Element[] = contentArr.map((content: string, index: number) => {
      return <p key={`textview-${index}`}>{content}</p>;
    });
    return (
      <div className="text-view view">
        <h3>{this.props.title}</h3>
        {contentElem}
      </div>
    );
  }
}

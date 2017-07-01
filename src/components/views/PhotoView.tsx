import * as React from "react";
import { DataItem } from "../../interfaces/Article";

const style: {} = { maxWidth: "100%", maxHeight: "inherit", margin: "auto", display: "block" };

export default class PhotoView extends React.Component<DataItem, {}> {
  public render(): JSX.Element {
    let {title, src, content}: DataItem = this.props;
    let srcElem: JSX.Element = (<div className="image-container" style={{ maxHeight: "500px" }}>
      <img style={style} src={src} />
    </div>);
    return (
      <div className="photo-view view">
        {title && <h3>{title}</h3> || <div/>}
        {src && srcElem || <div style={{ color: "red" }}>这个图片模块好像没有可用图片!!!</div>}
        {content !== "" ? <div className="content"> {content} </div> : null}
      </div>
    );
  }
}

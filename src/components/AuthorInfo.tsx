
import * as React from "react";
import { Link } from "react-router";


import { UserInfo } from "../interfaces/UserInfo";

interface OwnProps {
  time: string;
  authorId: number;
  authorInfo: UserInfo;
  isContent?: boolean;
  avgParddingPx?: string;
}

export class AuthorInfo extends React.Component<OwnProps, {}> {
  public render(): JSX.Element {
    let { time, authorId, authorInfo, avgParddingPx}: OwnProps = this.props;
    return (
      <div className="info" style={{}}>
        <a>
          <img style={{}} src={authorInfo && authorInfo.image} />
        </a>
        <span className="name">
          {authorInfo && authorInfo.userName}
        </span>
        <span className="time">
          {new Date(time).toLocaleString()}
        </span>
      </div>
    );
  }
}

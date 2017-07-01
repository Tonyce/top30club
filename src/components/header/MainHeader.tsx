import * as React from "react";
import { IndexLink, Link } from "react-router";


interface OwnProps {
  location: ReactRouter.LocationDescriptor;
  router?: ReactRouter.Router;
}

export class MainHeader extends React.Component<{}, {}> {

  // public componentDidMount() {
  // }

  public render(): JSX.Element {
    // const pathname: string = this.props.location.pathname;
    // console.log(pathname);
    return (
      <header className="header main-header">
        {/*MainHeader
        <i className="material-icons">face</i>
        sss
        <Link to="/about">about</Link>
        */}
        <div className="header-container">
        <Link to="/" className="icons-container">
          <img src="/static/iconfont/logo.svg"/>
        </Link>
        <IndexLink to="/" activeClassName="active">首页</IndexLink>
        <Link to="/about" activeClassName="active">关于</Link>
        </div>
      </header>
    );
  }
}

import * as React from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { Link } from "react-router";
import { Footer } from "../components/Footer";
import InfoContainer from "../containers/InfoContainer";
interface InfoHeaderProps {
  title: string;
}

interface OwnProps {
  children: JSX.Element;
  path: string;
  location: ReactRouter.LocationDescriptor;
}

interface ConnectedProps {
  params: ReactRouter.Router.Params;
}

export class InfoPage extends React.Component<ConnectedProps & OwnProps, {}> {
  public constructor() {
    super();
    this.state = {
      title: "",
    };
  }

  public componentDidMount(): void {
    setTimeout(() => {
      const thisDom: HTMLElement = document.getElementById("info");
      thisDom.style.opacity = "1";
      thisDom.style.minHeight = `${window.innerHeight - 60}px`;
    }, 300);
  }

  public render(): JSX.Element {
    const pathname: string = this.props.location.pathname;
    const paramId: string = this.props.params["id"];
    return (
      <div className="root">
        <header>
          {/*<Link to="/" className="icons-container">
            <i className="material-icons">home</i>
          </Link>*/}
          <div className="header-container">
          <Link to="/" className="icons-container">
            <img src="/static/iconfont/logo.svg"/>
          </Link>
          </div>
        </header>
        {/*<InfoHeader title={title} shadowHeight={110}/> */}
        <ReactCSSTransitionGroup
          component="div"
          transitionName="swap"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500} >
          {/*<Info key={id} id={id} parent={this}/>
          <ASide key={`${id}-aside`} articleId={id} />
          */}
          <InfoContainer key={pathname} paramId={paramId} />
        </ReactCSSTransitionGroup>
        <Footer />
      </div>
    );
  }
}

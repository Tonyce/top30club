import * as React from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { MainHeader } from "../components/header";
import { Footer } from "../components/Footer";

interface OwnProps {
  children: JSX.Element;
  path: string;
  // interface OwnProps {
  location: ReactRouter.LocationDescriptor;
  // router?: ReactRouter.Router;
// }
}

export class MainPage extends React.Component<OwnProps, {}> {
  public constructor(props: OwnProps) {
    super(props);
  };

  public render(): JSX.Element {
    const pathname: string = this.props.location.pathname;
    return (
      <div className="root">
        <MainHeader />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="swap"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {/*this.props.children*/}
          {React.cloneElement(this.props.children, { key: pathname })}
        </ReactCSSTransitionGroup>
        {/*this.props.children*/}
        <Footer />
      </div>
    );
  }
}

import * as React from "react";
import { Link } from "react-router";

// const style = require("./about.less");

interface OwnProps {
  location: ReactRouter.LocationDescriptor;
  router?: ReactRouter.Router;
}

interface OwnState {
  name: string;
}

export class About extends React.Component<OwnProps, OwnState> {

  public constructor(props: OwnProps) {
    super(props);
    this.state = {
      name: ""
    };
  }

  public componentDidMount(): void {
    // console.log("about");
    const thisDom: HTMLElement = document.getElementById("about");
    thisDom.style.minHeight = `${window.innerHeight - 60}px`;
  }

  public render(): JSX.Element {
    // const pathname: string = this.props.location.pathname;
    // console.log(pathname);
    return (
      <div className="about" id="about">
        About---{this.state.name}
        <Link to="/">index</Link>
      </div>
    );
  }
}

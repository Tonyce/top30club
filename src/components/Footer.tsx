import * as React from "react";
// import { RocketIcon } from "../icon/Icons";
// const version: string = require("json!../../package.json").version;
const version: string = "1.0Beta";

interface OwnState {
  showRocket: boolean;
}
export class Footer extends React.Component<{}, OwnState> {
  public constructor() {
    super();
    this.state = {
      showRocket: false
    };
  }
  private scrollTopTimer: number = null;
  private scrollToTop = () => {
    this.scrollTopTimer = window.setInterval(
    () => {
      let pos: number = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 70); // how far to scroll on each step
      } else {
        window.clearInterval(this.scrollTopTimer);
      }
    },
    15);
  }

  private handleScroll: EventListener = (e: Event): void => {
    let top: number = window.pageYOffset || document.documentElement.scrollTop;
    this.setState({
      showRocket: top > window.innerHeight / 2
    });
  }

  public componentDidMount(): void {
    window.addEventListener("scroll", this.handleScroll, false);
    let top: number = window.pageYOffset || document.documentElement.scrollTop;
    this.setState({
      showRocket: top > window.innerHeight / 2
    });
  }

  public componentWillMount(): void {
    // console.log("Footer will mount");
  };

  public componentWillUnmount(): void {
    window.removeEventListener("scroll", this.handleScroll);
  }

  public render(): JSX.Element {
    let upElem: JSX.Element = this.state.showRocket &&
        <RocketIcon className="go-up" onClick={this.scrollToTop.bind(this)} /> || null;
    return (
      <div className="footer">
        {upElem}
        <p className="build">
          v{version} [Build and Server Render
          with React / Nodejs / TypeScript / webpack] &nbsp; &nbsp;
        </p>
      </div>
    );
  }
}

export class RocketIcon extends React.Component<any, {}> {
  public render(): JSX.Element {
    return (
      <svg {...this.props}
            version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="64" height="64"
            viewBox="0 0 64 64">
        <title>rocket2</title>
        <path d="M44 4l-20 20h-12l-12 16c0 0 12.713-3.541 20.129-1.88l-20.129 25.88 26.369-20.509c3.677 8.416-2.369 20.509-2.369 20.509l16-12v-12l20-20 4-20-20 4z"></path>
      </svg>
    )
  }
}

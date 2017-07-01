import * as React from "react";

interface OwnProps {
  labels: string[];
}

export default class Label extends React.Component<OwnProps, {}> {
  public render(): JSX.Element {
    let { labels }: OwnProps = this.props;
    let labelElems: JSX.Element[] = labels.map((label: string, index: number) => {
      return <span>{label}</span>;
    });
    return (
      <div className="label">
        {labelElems}
      </div>
    );
  }
}

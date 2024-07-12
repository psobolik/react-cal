import React from "react";
import Util from "./util.ts";

interface HeadingProps {
  selectedDate: Date;
}

// interface HeadingState {}
export default class Heading extends React.Component<HeadingProps, never> {
  render = () => {
    const heading = `${Util.getMonthString(this.props.selectedDate.getMonth())} ${this.props.selectedDate.getDate()}, ${this.props.selectedDate.getFullYear()}`
    return (
      <div style={{
        gridRow: 1,
        gridColumn: 2,
        flexFlow: "column",
        flexGrow: 1,
        textAlign: "center",
        fontSize: "xxx-large"
      }}>{heading}</div>
    )
  }
}
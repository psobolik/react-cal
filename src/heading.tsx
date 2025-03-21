import React from "react";
import Util from "./util.ts";

interface HeadingProps {
    gridRow: string;
    gridCol: string;
    selectedDate: Date;
}

const Heading: React.FunctionComponent<HeadingProps> = props => {
    const heading = `${Util.getMonthString(props.selectedDate.getMonth())} ${props.selectedDate.getDate()}, ${props.selectedDate.getFullYear()}`
    return (<div style={{
            gridRow: props.gridRow,
            gridColumn: props.gridCol,
            flexFlow: "column",
            flexGrow: 1,
            textAlign: "center",
            fontSize: "xxx-large"
        }}>{heading}</div>)
}
export default Heading;
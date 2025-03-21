import React from "react";
import "./styles/control-panel.css";
import {DatePart} from "./date-part.ts";

interface ControlPanelProps {
    gridRow: string;
    gridCol: string;
    onChangeDate: (datePart: DatePart, amount: number) => void,
    canExpand: boolean,
    expand: () => void,
    canContract: boolean,
    contract: () => void,
    goToToday: () => void,
}

const ControlPanel: React.FunctionComponent<ControlPanelProps> = props => {
    // Vite replaces SVG files in the assets folder with their contents when
    // it builds, but that doesn't work with symbol sets like we are using.
    // When the SVG file is in the public folder, it rewrites the href
    // attributes but without accounting for the fact that we are specifying an
    // alternative base path when we build. This rigmarole uses a Vite
    // environment setting to locate the file at runtime.
    const icon = (fragment: string) => {
        let url = `${import.meta.env.BASE_URL}`;
        if (!url.endsWith("/")) url += "/";
        return `${url}icons.svg#${fragment}`;
    }

    const decYear = () => {
        props.onChangeDate(DatePart.Year, -1);
    }

    const incYear = () => {
        props.onChangeDate(DatePart.Year, 1);
    }

    const decMonth = () => {
        props.onChangeDate(DatePart.Month, -1);
    }

    const incMonth = () => {
        props.onChangeDate(DatePart.Month, 1);
    }

    const decWeek = () => {
        props.onChangeDate(DatePart.Date, -7);
    }

    const incWeek = () => {
        props.onChangeDate(DatePart.Date, 7);
    }

    const decDate = () => {
        props.onChangeDate(DatePart.Date, -1);
    }

    const incDate = () => {
        props.onChangeDate(DatePart.Date, 1);
    }

    interface ControlPanelButtonProps {
        prompt: string;
        iconFragment: string;
        iconClassName: string;
        disabled: boolean;
        action: () => void;
    }

    const ControlPanelButton: React.FunctionComponent<ControlPanelButtonProps> = props => {
        return <button title={props.prompt} onClick={props.action} disabled={props.disabled}>
            <svg className={props.iconClassName}>
                <use xlinkHref={icon(props.iconFragment)}/>
            </svg>
        </button>
    }

    interface ControlPanelRowProps {
        gridRow: number;
        label: string;
        leftButtonProps?: ControlPanelButtonProps;
        rightButtonProps?: ControlPanelButtonProps;
    }

    const ControlPanelRow: React.FunctionComponent<ControlPanelRowProps> = props => {
        return <div className="control-container" style={{gridRow: props.gridRow, display: "inline-grid", columnGap: "0.5em",  gridTemplateColumns: "repeat(3, 1fr)"}}>
            <div style={{gridColumn: 1}}>
                {props.leftButtonProps ? <ControlPanelButton {...(props.leftButtonProps)}/> : <></>}
            </div>
            <div style={{gridColumn: 2}}>{props.label}</div>
            <div style={{gridColumn: 3}}>
                {props.rightButtonProps ? <ControlPanelButton {...(props.rightButtonProps)}/> : <></>}
            </div>
        </div>
    }
    return <>
        <div id="control-panel"
             style={{gridRow: props.gridRow, gridColumn: props.gridCol, display: "inline-grid", rowGap: "0.5em"}}>
            <ControlPanelRow
                gridRow={1}
                label={"Day"}
                leftButtonProps={{
                    prompt: "Previous Day", iconFragment: "caret-up", iconClassName: "left", disabled: false, action: decDate
                }}
                rightButtonProps={{
                    prompt: "Next Day", iconFragment: "caret-up", iconClassName: "right", disabled: false, action: incDate
                }}
            />
            <ControlPanelRow
                gridRow={2}
                label={"Week"}
                leftButtonProps={{
                    prompt: "Prev Week", iconFragment: "caret-up", iconClassName: "up", disabled: false, action: decWeek
                }}
                rightButtonProps={{
                    prompt: "Next Week", iconFragment: "caret-up", iconClassName: "down", disabled: false, action: incWeek
                }}
            />
            <ControlPanelRow
                gridRow={3}
                label={"Month"}
                leftButtonProps={{
                    prompt: "Prev Month", iconFragment: "caret-up", iconClassName: "up", disabled: false, action: decMonth
                }}
                rightButtonProps={{
                    prompt: "Next Month", iconFragment: "caret-up", iconClassName: "down", disabled: false, action: incMonth
                }}
            />
            <ControlPanelRow
                gridRow={4}
                label={"Year"}
                leftButtonProps={{
                    prompt: "Prev Year", iconFragment: "caret-up", iconClassName: "up", disabled: false, action: decYear
                }}
                rightButtonProps={{
                    prompt: "Next Year", iconFragment: "caret-up", iconClassName: "down", disabled: false, action: incYear
                }}
            />
            <ControlPanelRow
                gridRow={5}
                label={"Size"}
                leftButtonProps={{
                    prompt: "Show More", iconFragment: "plus", iconClassName: "up", disabled: !props.canExpand, action: props.expand
                }}
                rightButtonProps={{
                    prompt: "Show Less", iconFragment: "dash", iconClassName: "up", disabled: !props.canContract, action: props.contract
                }}
            />
            <ControlPanelRow
                gridRow={6}
                label={"Today"}
                rightButtonProps={{
                    prompt: "Go to Today", iconFragment: "calendar-check", iconClassName: "up", disabled: false, action: props.goToToday
                }}
            />
        </div>
    </>
}
export default ControlPanel;
import React from "react";
import "./styles/control-panel.css";
import {DatePart} from "./app.tsx";

interface ControlPanelProps {
  onChangeDate: (datePart: DatePart, amount: number) => void,
  onResize: (increase: boolean) => void,
  onGoToToday: () => void,
}
export default class ControlPanel extends React.Component<ControlPanelProps, never> {
  render() {
    return (
      <div id="control-panel" style={{gridRow: 2, gridColumn: 1, display: "inline-grid", rowGap: "0.5em"}}>
        <div id="day-controls" className="control-container" style={{gridRow: 1}}>
          <div style={{gridColumn: 1}}>
            <button id="prev-day-button" title="Previous Day" onClick={this.decDate.bind(this)}>
              <svg className="left">
                <use xlinkHref={this.icon("caret-up")}/>
              </svg>
            </button>
          </div>
          <div style={{gridColumn: 2}}>Day</div>
          <div style={{gridColumn: 3}}>
            <button id="next-day-button" title="Next Day" onClick={this.incDate.bind(this)}>
              <svg className="right">
                <use xlinkHref={this.icon("caret-up")}/>
              </svg>
            </button>
          </div>
        </div>
        <div id="week-controls" className="control-container" style={{gridRow: 2}}>
          <div style={{gridColumn: 1}}>
            <button id="prev-week-button" title="Previous Week" onClick={this.decWeek.bind(this)}>
              <svg className="up">
                <use xlinkHref={this.icon("caret-up")}/>
              </svg>
            </button>
          </div>
          <div style={{gridColumn: 2}}>Week</div>
          <div style={{gridColumn: 3}}>
            <button id="next-week-button" title="Next Week" onClick={this.incWeek.bind(this)}>
              <svg className="down">
                <use xlinkHref={this.icon("caret-up")}/>
              </svg>
            </button>
          </div>
        </div>
        <div id="month-controls" className="control-container" style={{gridRow: 3}}>
          <div style={{gridColumn: 1}}>
            <button id="prev-month-button" title="Previous Month" onClick={this.decMonth.bind(this)}>
              <svg className="up">
                <use xlinkHref={this.icon("caret-up")}/>
              </svg>
            </button>
          </div>
          <div style={{gridColumn: 2}}>Month</div>
          <div style={{gridColumn: 3}}>
            <button id="next-month-button" title="Next Month" onClick={this.incMonth.bind(this)}>
              <svg className="down">
                <use xlinkHref={this.icon("caret-up")}/>
              </svg>
            </button>
          </div>
        </div>
        <div id="year-controls" className="control-container" style={{gridRow: 4}}>
          <div style={{gridColumn: 1}}>
            <button id="prev-year-button" title="Previous Year" onClick={this.decYear.bind(this)}>
              <svg className="up">
                <use xlinkHref={this.icon("caret-up")}/>
              </svg>
            </button>
          </div>
          <div style={{gridColumn: 2}}>Year</div>
          <div style={{gridColumn: 3}}>
            <button id="next-year-button" title="Next Year" onClick={this.incYear.bind(this)}>
              <svg className="down">
                <use xlinkHref={this.icon("caret-up")}/>
              </svg>
            </button>
          </div>
        </div>
        <div id="size-controls" className="control-container"
             style={{gridRow: 5}}>
          <div style={{gridColumn: 1}}>
            <button id="show-more-button" title="Show More" onClick={this.expand.bind(this)}>
              <svg className="up">
                <use xlinkHref={this.icon("plus")}/>
              </svg>
            </button>
          </div>
          <div style={{gridColumn: 2}}>Size</div>
          <div style={{gridColumn: 3}}>
            <button id="show-less-button" title="Show Less" onClick={this.contract.bind(this)}>
              <svg className="up">
                <use xlinkHref={this.icon("dash")}/>
              </svg>
            </button>
          </div>
        </div>
        <div id="today-controls" className="control-container"
             style={{gridRow: 6}}>
          <div style={{gridColumn: 2}}>Today</div>
          <div style={{gridColumn: 3}}>
            <button id="today-button" title="Go to Today" onClick={this.gotoToday.bind(this)}>
              <svg className="up">
                <use xlinkHref={this.icon("calendar-check")}/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Vite replaces SVG files in the assets folder with their contents when it builds, but that doesn't work with
  // symbol sets like we are using. When the SVG file is in the public folder, it rewrites the href attributes
  // but without accounting for the fact that we are specifying an alternative base path when we build.
  // This rigmarole uses a Vite environment setting to locate the file at runtime.
  icon = (fragment: string) => {
    let url = `${import.meta.env.BASE_URL}`;
    if (!url.endsWith("/")) url += "/";
    return `${url}icons.svg#${fragment}`;
  }

  decYear = () => {
    this.props.onChangeDate(DatePart.Year, -1);
  }

  incYear() {
    this.props.onChangeDate(DatePart.Year, 1);
  }

  decMonth() {
    this.props.onChangeDate(DatePart.Month, -1);
  }

  incMonth() {
    this.props.onChangeDate(DatePart.Month, 1);
  }

  decWeek() {
    this.props.onChangeDate(DatePart.Date, -7);
  }

  incWeek() {
    this.props.onChangeDate(DatePart.Date, 7);
  }

  decDate() {
    this.props.onChangeDate(DatePart.Date, -1);
  }

  incDate() {
    this.props.onChangeDate(DatePart.Date, 1);
  }

  gotoToday() {
    this.props.onGoToToday();
  }

  expand() {
    this.props.onResize(true);
  }

  contract() {
    this.props.onResize(false);
  }
}
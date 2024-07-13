import React, {ReactNode} from "react";
import "./styles/calendar.css";
import Util from "./util.ts";

interface CalendarProps {
  selectedDate: Date
  weeks: number,
  onSetDate: (date: Date) => void,
}

export default class Calendar extends React.Component<CalendarProps, never> {
  static minWeeks: number = 6;
  static daysInWeek: number = 7;

  constructor(props: CalendarProps) {
    super(props);
  }

  render = () => {
    return (
      <div style={{gridRow: "2/4", gridColumn: 2}}>
        <div id="calendar">
          <div className="calendar-row">
            <div key="1" className="cell heading">Sunday</div>
            <div key="2" className="cell heading">Monday</div>
            <div key="3" className="cell heading">Tuesday</div>
            <div key="4" className="cell heading">Wednesday</div>
            <div key="5" className="cell heading">Thursday</div>
            <div key="6" className="cell heading">Friday</div>
            <div key="7" className="cell heading">Saturday</div>
          </div>
          <div id="calendar-container" className="calendar-row">
            {this.buildCalendarCells()}
          </div>
        </div>
      </div>
    )
  }

  private buildCalendarCells = () => {
    const day1 = new Date(this.props.selectedDate.getFullYear(), this.props.selectedDate.getMonth(), 1);
    let dayPointer = Calendar.getDay0(day1, this.props.weeks, Calendar.minWeeks);
    const today = new Date();

    const cells: ReactNode[] = [];
    for (let row = 0; row < this.props.weeks; row++) {
      for (let col = 0; col < Calendar.daysInWeek; col++) {
        const year = dayPointer.getFullYear();
        const month = dayPointer.getMonth();
        const date = dayPointer.getDate();

        const showMonth = date === 1 || (row === 0 && col === 0);
        const cell = <div
          key={`${row}${col}`}
          data-date={date}
          data-month={month}
          data-year={year}
          className={Calendar.getCellClassName(dayPointer, today, this.props.selectedDate, showMonth)}
          onClick={(event: React.MouseEvent) => {
            const cell = event.target as HTMLElement;
            this.props.onSetDate(new Date(Number(cell.dataset["year"]), Number(cell.dataset["month"]), Number(cell.dataset["date"])));
          }}
        >
          {Calendar.forDisplay(dayPointer, showMonth)}
        </div>
        cells.push(cell)
        dayPointer = new Date(year, month, date + 1);
      }
    }
    return cells;
  }

  private static getCellClassName = (date: Date, today: Date, selectedDate: Date, showMonth: boolean): string => {
    const classNames = ["cell"];
    if (date.getMonth() === today.getMonth()) classNames.push('current-month');
    if (showMonth) classNames.push('show-month');
    if (Util.sameDate(date, today)) classNames.push('current-day');
    if (Util.sameDate(date, selectedDate)) classNames.push('selected-day');
    return classNames.join(' ');
  }

  private static getDay0 = (day1: Date, weeks: number, minWeeks: number) => {
    const day0 = new Date(day1);
    day0.setDate((day1.getDate() - (7 * ((weeks - minWeeks) >> 1) + day1.getDay())));
    return day0;
  }

  private static forDisplay = (date: Date, showMonth: boolean): string => {
    return `${(showMonth ? `${Util.getMonthString(date.getMonth())} ` : '')} ${date.getDate()}`;
  }
}
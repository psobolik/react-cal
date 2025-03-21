import React from "react";
import "./styles/calendar.css";
import Util from "./util.ts";
import Constants from "./constants.ts";

export const MinWeeks: number = 6;
export const MaxWeeks: number = 52;

interface CalendarProps {
    gridRow: string;
    gridColumn: string;
    selectedDate: Date,
    weeks: number,
    onSetDate: (date: Date) => void,
}

const Calendar: React.FunctionComponent<CalendarProps> = (props) => {
    interface CalendarGridProps {
        selectedDate: Date;
        weeks: number;
        setDate: (date: Date) => void;
    }

    const CalendarGrid: React.FunctionComponent<CalendarGridProps> = props => {
        interface CalendarGridRowProps {
            today: Date;
            selectedDate: Date;
            rowDate: Date;
            row: number;
            setDate: (date: Date) => void;
        }

        const CalendarGridRow: React.FunctionComponent<CalendarGridRowProps> = props => {
            interface DateCellProps {
                today: Date;
                selectedDate: Date;
                cellDate: Date;
                row: number;
                col: number;
                setDate: (date: Date) => void;
            }

            const DateCell: React.FunctionComponent<DateCellProps> = props => {
                const cellClassName = (date: Date, today: Date, selectedDate: Date, showMonth: boolean): string => {
                    const classNames = ["cell"];
                    if (date.getMonth() === today.getMonth()) classNames.push('current-month');
                    if (showMonth) classNames.push('show-month');
                    if (Util.sameDate(date, today)) classNames.push('current-day');
                    if (Util.sameDate(date, selectedDate)) classNames.push('selected-day');
                    return classNames.join(' ');
                }

                const year = props.cellDate.getFullYear();
                const month = props.cellDate.getMonth();
                const date = props.cellDate.getDate();

                const showMonth = date === 1 || (props.row === 0 && props.col === 0);

                return <div
                    className={cellClassName(props.cellDate, props.today, props.selectedDate, showMonth)}
                    onClick={() => props.setDate(new Date(year, month, date))}
                >
                    {showMonth ? `${Util.getMonthAbbrString(month)} ${date}, ${year}` : date}
                </div>
            }
            let rowDate = props.rowDate;
            return Util.numbers(Constants.DaysInWeek).map(day => {
                const cell = <DateCell
                    key={day}
                    today={props.today}
                    selectedDate={props.selectedDate}
                    cellDate={rowDate}
                    row={props.row}
                    col={day}
                    setDate={props.setDate}
                />
                // Add one day
                rowDate = Util.addDays(rowDate, 1);
                return cell;
            })
        }
        const day1 = new Date(props.selectedDate.getFullYear(), props.selectedDate.getMonth(), 1);
        let dayPointer = getDay0(day1, props.weeks, MinWeeks);
        const today = new Date();

        return Util.numbers(props.weeks).map(row => {
            const gridRow = <CalendarGridRow
                key={row}
                today={today}
                selectedDate={props.selectedDate}
                rowDate={dayPointer}
                row={row}
                setDate={props.setDate}
            />
            // Add seven days
            dayPointer = Util.addDays(dayPointer, Constants.DaysInWeek);
            return gridRow;
        });
    }

    const CalendarHeading: React.FunctionComponent = () => {
        return Util.numbers(Constants.DaysInWeek).map(dow => {
            return <div key={dow} className={"cell heading"}>{Util.getDayOfWeekString(dow)}</div>
        })
    }
    const getDay0 = (day1: Date, weeks: number, minWeeks: number) => {
        const day0 = new Date(day1);
        day0.setDate((day1.getDate() - (7 * ((weeks - minWeeks) >> 1) + day1.getDay())));
        return day0;
    }

    return (<div style={{gridRow: props.gridRow, gridColumn: props.gridColumn}}>
        <div id="calendar">
            <div className="calendar-row">
                <CalendarHeading/>
            </div>
            <div id="calendar-container" className="calendar-row">
                <CalendarGrid
                    selectedDate={props.selectedDate}
                    weeks={props.weeks}
                    setDate={props.onSetDate}
                />
            </div>
        </div>
    </div>)
}
export default Calendar;
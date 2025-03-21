import './styles/app.css'

import React from 'react'
import ControlPanel from "./control-panel.tsx";
import Heading from "./heading.tsx";
import Calendar, {MinWeeks, MaxWeeks} from "./calendar.tsx";
import {DatePart} from "./date-part.ts";
import Constants from "./constants.ts";

const App: React.FunctionComponent = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
    const [weeks, setWeeks] = React.useState<number>(MinWeeks);
    const [keyUpEventCode, setKeyUpEventCode] = React.useState<string>();

    const changeDate = React.useCallback((datePart: DatePart, amount: number) => {
        let year = selectedDate.getFullYear()
        let month = selectedDate.getMonth();
        let date = selectedDate.getDate();
        switch (datePart) {
            case DatePart.Date:
                date += amount;
                break;
            case DatePart.Month:
                month += amount;
                break;
            case DatePart.Year:
                year += amount;
                break;
        }
        setSelectedDate(new Date(year, month, date));
    }, [selectedDate])

    const goToToday = (): void => {
        setSelectedDate(new Date())
    }

    const expand = React.useCallback(() => {
        setWeeks(Math.min(weeks + 2, MaxWeeks));
    }, [weeks])

    const contract = React.useCallback(() => {
        setWeeks(Math.max(weeks - 2, MinWeeks));
    }, [weeks])

    const handleKeyUp = React.useCallback((eventCode: string) => {
        switch (eventCode) {
            case 'ArrowLeft':
                changeDate(DatePart.Date, -1);
                break;
            case 'ArrowRight':
                changeDate(DatePart.Date, 1);
                break;
            case 'ArrowUp':
                changeDate(DatePart.Date, -Constants.DaysInWeek);
                break;
            case 'ArrowDown':
                changeDate(DatePart.Date, Constants.DaysInWeek);
                break;
            case 'PageUp':
                changeDate(DatePart.Month, -1);
                break;
            case 'PageDown':
                changeDate(DatePart.Month, 1);
                break;
            case 'Equal':
            case 'NumpadAdd':
            case 'Insert':
                expand();
                break;
            case 'Minus':
            case 'NumpadSubtract':
            case 'Delete':
                contract();
                break;
            case 'Home':
                goToToday()
        }
        setKeyUpEventCode(undefined)
    }, [changeDate, contract, expand])

    React.useEffect(() => {
        const keyUp = (event: KeyboardEvent) => setKeyUpEventCode(event.code);
        window.addEventListener("keyup", keyUp);
        return () => {
            window.removeEventListener("keyup", keyUp);
        }
    }, [])
    React.useEffect(() => {
        if (keyUpEventCode) handleKeyUp(keyUpEventCode);
    }, [handleKeyUp, keyUpEventCode]);

    return (<div style={{display: "inline-grid", columnGap: "1em"}}>
            <ControlPanel gridRow={"2"} gridCol={"1"} expand={expand} canExpand={weeks < MaxWeeks} contract={contract} canContract={weeks > MinWeeks} goToToday={goToToday} onChangeDate={changeDate}/>
            <Heading gridRow={"1"} gridCol={"2"} selectedDate={selectedDate}/>
            <Calendar gridRow={"2/4"} gridColumn={"2"} weeks={weeks} selectedDate={selectedDate}
                      onSetDate={(selectedDate: Date) => setSelectedDate(selectedDate)}/>
        </div>)
}
export default App;
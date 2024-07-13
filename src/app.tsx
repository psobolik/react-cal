import './styles/app.css'

import React from 'react'
import ControlPanel from "./control-panel.tsx";
import Heading from "./heading.tsx";
import Calendar from "./calendar.tsx";

export enum DatePart {
  Date,
  Month,
  Year
}

interface AppProps {}
interface AppState {
  selectedDate: Date,
  weeks: number
}

export default class App extends React.Component<AppProps, AppState> {
  state: AppState = {selectedDate: new Date(), weeks: Calendar.minWeeks};

  constructor(props: AppProps) {
    super(props);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  render = () => {
    return (
      <div style={{display: "inline-grid", columnGap: "1em"}}>
        <ControlPanel onResize={this.setSize} onGoToToday={this.goToToday} onChangeDate={this.changeDate}/>
        <Heading selectedDate={this.state.selectedDate}/>
        <Calendar weeks={this.state.weeks} selectedDate={this.state.selectedDate}
                  onSetDate={(selectedDate: Date) => this.setState({selectedDate: selectedDate})}/>
      </div>
    )
  }

  handleKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowLeft':
        this.changeDate(DatePart.Date, -1);
        break;
      case 'ArrowRight':
        this.changeDate(DatePart.Date, 1);
        break;
      case 'ArrowUp':
        this.changeDate(DatePart.Date, -7);
        break;
      case 'ArrowDown':
        this.changeDate(DatePart.Date, 7);
        break;
      case 'PageUp':
        this.changeDate(DatePart.Month, -1);
        break;
      case 'PageDown':
        this.changeDate(DatePart.Month, 1);
        break;
      case 'Equal':
      case 'NumpadAdd':
      case 'Insert':
        this.expand();
        break;
      case 'Minus':
      case 'NumpadSubtract':
      case 'Delete':
        this.contract();
        break;
      case 'Home':
        this.goToToday()
    }
  }

  changeDate = (datePart: DatePart, amount: number) => {
    let year = this.state.selectedDate.getFullYear()
    let month = this.state.selectedDate.getMonth();
    let date = this.state.selectedDate.getDate();
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
    this.setState({selectedDate: new Date(year, month, date)});
  }

  goToToday = (): void => {
    this.setState({selectedDate: new Date()})
  }

  setSize = (increase: boolean): void => {
    const weeks = increase ? this.state.weeks + 2 : this.state.weeks - 2;
    if (weeks >= Calendar.minWeeks)
      this.setState({weeks: weeks});
  }

  expand = () => {
    this.setSize(true);
  }

  contract = () => {
    this.setSize(false);
  }
}

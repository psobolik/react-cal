import Constants from "./constants.ts";

export default class Util {
  // Returns a string describing the month for a specific month number
  public static getMonthString = (month: number) => {
    return ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'][month % 12];
  }
  public static getMonthAbbrString = (month: number) => {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month % 12];
  }
  // Returns a string describing the day of the week for a specific day number
  public static getDayOfWeekString = (day: number) => {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day % Constants.DaysInWeek]
  }
  // Compares two dates by year, month and date
  public static sameDate = (date1: Date, dateB: Date) => {
    return date1.getFullYear() === dateB.getFullYear()
      && date1.getMonth() === dateB.getMonth()
      && date1.getDate() === dateB.getDate();
  }
  // Returns a date with the specified number of days added to it
  public static addDays = (date: Date, days: number)=> {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  }
  // Returns an array of numbers from 0 to limit
  public static numbers = (length: number): number[] => {
    return Array.from(Array(length).keys());
  }
}
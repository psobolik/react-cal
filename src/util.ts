export default class Util {
  public static getMonthString = (month: number) => {
    return ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'][month % 12];
  }
  public static sameDate = (date1: Date, dateB: Date) => {
    return date1.getFullYear() === dateB.getFullYear()
      && date1.getMonth() === dateB.getMonth()
      && date1.getDate() === dateB.getDate();
  }
}
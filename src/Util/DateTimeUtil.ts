export default class DataTimeUtil {
  static getNowDate(): string {
    const date = new Date();
    let month: string | number = date.getMonth() + 1;
    let strDate: string | number = date.getDate();

    if (month <= 9) {
      month = "0" + month;
    }

    if (strDate <= 9) {
      strDate = "0" + strDate;
    }

    return date.getFullYear() + "-" + month + "-" + strDate + " "
      + this.GetTime(date);
  }

  static GetNowTime(isGetSeconds: boolean = true): string {
    const date = new Date();
    return this.GetTime(date, isGetSeconds);
  }
  static GetTime(date: Date, isGetSeconds: boolean = true): string {
    let hours: string | number = date.getHours();
    let minu: string | number = date.getMinutes();
    let time: string = "";
    if (hours < 10)
      hours = "0" + hours;
    if (minu < 10)
      minu = "0" + hours;
    time = hours + ":" + minu
    if (isGetSeconds) {
      let second: string | number = date.getSeconds();
      if (second < 10)
        second = "0" + second;
      time += ":" + second
    }
    return time;
  }

  static ConverDate(dateTime: Date | null): string {
    if (dateTime != null) {
      let month: string | number = dateTime.getMonth() + 1;
      let strDate: string | number = dateTime.getDate();

      if (month <= 9) {
        month = "0" + month;
      }

      if (strDate <= 9) {
        strDate = "0" + strDate;
      }

      return dateTime.getFullYear() + "-" + month + "-" + strDate;
    }
    return "";
  }
  static ConverTime(dateTime: Date | null): string {
    if (dateTime != null) {
      return dateTime.getHours() + ":" + dateTime.getMinutes();
    }
    return "";
  }

}
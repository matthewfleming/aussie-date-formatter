export class DateFormatter {
  private options: Record<string, any>;
  constructor(private date: Date, private tz: string) {
    this.options = { timeZone: tz };
  }
  setTimeZone(tz: string) {
    this.options.timeZone = tz;
  }
  getYear(format: "2-digit" | "numeric" = "numeric") {
    return this.date.toLocaleString("en-US", {
      ...this.options,
      year: format,
    });
  }
  getMonth(
    format: "2-digit" | "numeric" | "narrow" | "short" | "long" = "numeric"
  ) {
    return this.date.toLocaleString("en-US", {
      ...this.options,
      month: format,
    });
  }
  getDay(format: "2-digit" | "numeric" = "numeric") {
    return this.date.toLocaleString("en-US", {
      ...this.options,
      day: format,
    });
  }
  getHour(format: "2-digit" | "numeric" = "numeric") {
    const hour = this.date.toLocaleTimeString("en-US", {
      ...this.options,
      hour: format
    })
    return hour.slice(0,-3)
  }
  getMinute(format: "2-digit" | "numeric" = "numeric") {
    return this.date.toLocaleTimeString("en-US", {
        ...this.options,
        minute: format
      })
  }
  getSecond(format: "2-digit" | "numeric" = "numeric") {
    return this.date.toLocaleTimeString("en-US", {
        ...this.options,
        second: format
      })
  }
  getMeridiem(format: "2-digit" | "numeric" = "numeric") {
    return this.date.toLocaleTimeString("en-US", {
        ...this.options,
        hour: format
      }).slice(-2)
  }
  getTimeZoneName(format: "long" | "short" | "offset" = "short") {
    const tz = this.date
      .toLocaleDateString("en-US", {
        ...this.options,
        timeZoneName: "short",
      })
      .split(" ")
      .pop();
    if(format === 'offset') {
        const offset = tz?.slice(3)
        if(offset?.length === 0) {
            return 'Z'
        }
        if(offset?.length === 2) {
            return offset.charAt(0) + '0' + offset.charAt(1) + ':00'
        }
        if(offset?.length === 3) {
            return offset + ':00'
        }
        return offset
    }
    switch (tz) {
      case "GMT+8":
        return format === "short" ? "AWST" : "Australian Western Standard Time";
      case "GMT+9:30":
        return format === "short" ? "ACST" : "Australian Central Standard Time";
      case "GMT+10":
        return format === "short" ? "AEST" : "Australian Eastern Standard Time";
      case "GMT+10:30":
        return format === "short" ? "ACDT" : "Australian Central Daylight Time";
      case "GMT+11":
        return format === "short" ? "AEDT" : "Australian Eastern Daylight Time";
      default:
        return format === "short"
          ? tz
          : this.date
              .toLocaleDateString("en-US", {
                ...this.options,
                timeZoneName: "lon",
              })
              .split(" ")
              .pop();
    }
  }
  toDate() {
    return `${this.getDay()}/${this.getMonth()}/${this.getYear()}`;
  }
  toDateTime() {
    return `${this.toDate()} ${this.toTime()}`;
  }
  toDateTimeTz() {
    return `${this.toDateTime()} ${this.getTimeZoneName()}`;
  }
  toIsoDate() {
    return `${this.getYear()}-${this.getMonth("2-digit")}-${this.getDay(
      "2-digit"
    )}`;
  }
  toIsoDateTime() {
    return `${this.toIsoDate()}T${this.toTime('2-digit').slice(0,-3)}${this.getTimeZoneName('offset')}`
  }
  toTime(format: "2-digit" | "numeric" = "numeric", seconds = true) {
    return this.date.toLocaleTimeString("en-US", {
      ...this.options,
      hour: format,
      minute: '2-digit',
      second: seconds ? '2-digit': undefined
    });
  }
  toTimeTz() {
    return `${this.toTime()} ${this.getTimeZoneName()}`;
  }
}

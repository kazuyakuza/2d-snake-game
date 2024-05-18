import ENV from "../environment";

class Logger {
  private c!: Console;

  constructor(
    private readonly loggingLevel: 'none' | 'all',
  ) {
    this.c = console;
    // TOOD review
    // console.log = this.log.bind(this);
    // console.warn = this.warn.bind(this);
  }

  public log(...args: any[]) {
    if (this.loggingLevel === 'none') return;
    this.c.log(...args);
  }

  public warn(...args: any[]) {
    if (this.loggingLevel === 'none') return;
    this.c.warn;
  }
}
const logger = new Logger(ENV.LOGGING_LEVEL);
export default logger;

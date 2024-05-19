import ENV from "../environment";

class Logger {
  constructor(
    // - node excludes all
    // - alert includes alter only
    // - error includes alert
    // - warn includes error and alert
    // - all includes all
    private readonly loggingLevel: 'none' | 'alert' | 'error' | 'warn' | 'all',
  ) { }

  private parseMsg(msg: any[]) {
    return msg.length == 1 ? msg[0] : { msg };
  }

  private excludedFromLogging(
    method: 'alert' | 'error' | 'warn' | 'log'
  ) {
    switch (this.loggingLevel) {
      case 'none': return true;
      case 'alert': return method !== 'alert';
      case 'error': return method === 'warn' || method === 'log';
      case 'warn': return method === 'log';
      case 'all':
      default: return false;
    }
  }

  public log(...msg: any[]) {
    if (this.excludedFromLogging('log')) return;
    console.log(this.parseMsg(msg));
  }

  public warn(...msg: any[]) {
    if (this.excludedFromLogging('warn')) return;
    console.warn(this.parseMsg(msg));
  }

  public error(...msg: any[]) {
    if (this.excludedFromLogging('error')) return;
    console.error(this.parseMsg(msg));
  }

  public alert(...msg: any[]) {
    if (this.excludedFromLogging('alert')) return;
    alert(JSON.stringify(this.parseMsg(msg)));
  }
}
const logger = new Logger(ENV.LOGGING_LEVEL);
export default logger;

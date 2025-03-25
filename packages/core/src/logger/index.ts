export class Logger {
  private baseFields: Record<string, any>;
  private plugins: ((logData: Record<string, any>) => void)[] = [];

  constructor(baseFields: Record<string, any> = {}) {
    this.baseFields = baseFields;
  }

  use(plugin: (logData: Record<string, any>) => void) {
    this.plugins.push(plugin);
    return this;
  }

  private log(
    level: string,
    message: string,
    customFields: Record<string, any> = {}
  ) {
    const logData = {
      ...this.baseFields,
      level,
      message,
      ...customFields,
    };
    this.sendLog(logData);
  }

  private sendLog(logData: Record<string, any>) {
    this.plugins.forEach((plugin) => {
      plugin(logData);
    });
  }

  info(message: string, customFields?: Record<string, any>) {
    this.log("info", message, customFields);
  }

  warn(message: string, customFields?: Record<string, any>) {
    this.log("warn", message, customFields);
  }

  error(message: string, customFields?: Record<string, any>) {
    this.log("error", message, customFields);
  }
}

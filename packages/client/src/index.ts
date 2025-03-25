import { Logger, LogPlugin } from "@awesome-logger/core";

class Client {
  private logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger || new Logger();
  }

  usePlugin(plugin: LogPlugin) {
    this.logger.use(plugin);
    return this;
  }

  info(message: string, customFields?: Record<string, any>) {
    this.logger.info(message, customFields);
  }

  warn(message: string, customFields?: Record<string, any>) {
    this.logger.warn(message, customFields);
  }

  error(message: string, customFields?: Record<string, any>) {
    this.logger.error(message, customFields);
  }
}

export default Client;

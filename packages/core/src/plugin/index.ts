export abstract class LogPlugin<T> {
  protected options: T;

  constructor(options: T) {
    this.options = options;
  }

  abstract sendLog(logData: Record<string, any>): void;
}

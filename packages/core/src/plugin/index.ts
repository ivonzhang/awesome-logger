export abstract class LogPlugin {
  protected options: any;

  constructor(options: any) {
    this.options = options;
  }

  abstract sendLog(logData: Record<string, any>): void;
}

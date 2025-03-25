declare class Logger {
    private baseFields;
    private plugins;
    constructor(baseFields?: Record<string, any>);
    use(plugin: (logData: Record<string, any>) => void): this;
    private log;
    private sendLog;
    info(message: string, customFields?: Record<string, any>): void;
    warn(message: string, customFields?: Record<string, any>): void;
    error(message: string, customFields?: Record<string, any>): void;
}

declare abstract class LogPlugin<T> {
    protected options: T;
    constructor(options: T);
    abstract sendLog(logData: Record<string, any>): void;
}

export { LogPlugin, Logger };

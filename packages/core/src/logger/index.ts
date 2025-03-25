import { LogPlugin } from "../plugin";
import { ILoggerBaseFieldModel } from "../types";

export class Logger {
  private baseFields: ILoggerBaseFieldModel;
  private plugins: LogPlugin[] = [];

  constructor(
    baseFields: ILoggerBaseFieldModel = {
      uid: "",
      release: "",
    }
  ) {
    this.baseFields = baseFields;
  }

  /**
   * 使用插件
   * @param plugin
   * @returns
   */
  use(plugin: LogPlugin) {
    this.plugins.push(plugin);
    return this;
  }

  /**
   * 设置基础字段
   * 说明：有些场景是异步返回基础信息的，所以用这个来补偿
   * @param fields
   */
  setBaseField(fields: Partial<ILoggerBaseFieldModel>) {
    this.baseFields = {
      ...this.baseFields,
      ...(fields || {}),
    };
  }

  private log(
    type: string,
    key: string,
    customFields: Record<string, any> = {}
  ) {
    const logData = {
      ...this.baseFields,
      type,
      key,
      ...customFields,
    };
    this.sendLog(logData);
  }

  private sendLog(logData: Record<string, any>) {
    this.plugins.forEach((plugin) => {
      plugin?.sendLog(logData);
    });
  }

  /**
   * 发送 info 级别的日志
   * @param key
   * @param data
   */
  info(key: string, data?: Record<string, any>) {
    this.log("info", key, data);
  }

  /**
   * 发送 warn 级别的日志
   * @param key
   * @param data
   */
  warn(key: string, data?: Record<string, any>) {
    this.log("warn", key, data);
  }

  /**
   * 发送 error 级别的日志
   * @param key
   * @param data
   */
  error(key: string, data?: Record<string, any>) {
    this.log("error", key, data);
  }
}

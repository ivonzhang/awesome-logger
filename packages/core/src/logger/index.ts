import dayjs from 'dayjs';
import { serializeError } from 'serialize-error';

import { LogPlugin } from '../plugin';
import { ILoggerBaseFieldModel, ILoggerCommonFieldModel } from '../types';
import { clientSessionId, clientSessionTime, clientSessionTimeStr } from '../utils/env/host';
import { browser, browserVersion } from '../utils/dom/browser';
import { device, os, version as osVersion } from '../utils/env/os';

export class Logger {
  private seqId = 1; // 日志序号
  private baseFields: ILoggerBaseFieldModel;
  private plugins: LogPlugin[] = [];
  private commonFields: Partial<ILoggerCommonFieldModel> = {
    ua: navigator.userAgent,
    url: location.href,
    browser,
    browserVersion,
    os,
    osVersion,
    device,
    sessionId: clientSessionId,
    sessionTime: clientSessionTime,
    sessionTimeString: clientSessionTimeStr,
  };

  constructor(
    baseFields: ILoggerBaseFieldModel = {
      uid: '',
      release: '',
      env: '',
    },
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

  /**
   * 发送日志
   * @param type
   * @param key
   * @param data
   */
  private log(type: string, key: string, data?: Record<string, any> | string | number | boolean) {
    const clientTime = Date.now();
    const clientTimeStr = dayjs(clientTime).format('MM-DD HH:mm:ss');
    const sendSeqId = this.seqId++;
    // 合并日志数据
    const logData = {
      ...this.commonFields,
      ...this.baseFields,
      type,
      key,
      data,
      ...{
        clientTime,
        clientTimeStr,
      },
      seqId: sendSeqId,
    };
    this.sendLog(logData);
  }

  private sendLog(logData: Record<string, any>) {
    const friendlyData = { ...logData };
    // 处理 Error 类型的数据
    for (const key in friendlyData) {
      const value = friendlyData[key];
      if (value instanceof Error) {
        friendlyData[key] = serializeError(value);
      }
    }
    this.plugins.forEach((plugin) => {
      plugin?.sendLog(friendlyData);
    });
  }

  /**
   * 发送 info 级别的日志
   * @param key
   * @param data
   */
  info(key: string, data?: Record<string, any>) {
    this.log('info', key, data);
  }

  /**
   * 发送 warn 级别的日志
   * @param key
   * @param data
   */
  warn(key: string, data?: Record<string, any>) {
    this.log('warn', key, data);
  }

  /**
   * 发送 error 级别的日志
   * @param key
   * @param data
   */
  error(key: string, data?: Record<string, any>) {
    this.log('error', key, data);
  }
}

export interface ILoggerBaseFieldModel {
  uid: string | number; // 用户 uid
  release: string; // app 版本号，如：0.1.0
  [key: string]: any;
}

export type ILoggerLevel = 'info' | 'warn' | 'error';

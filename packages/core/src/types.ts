export interface ILoggerBaseFieldModel {
  uid: string | number; // 用户 uid
  release: string; // app 版本号，如：0.1.0
  env: string; // 部署环境，如：dev、test、prod
  [key: string]: any;
}

export type ILoggerLevel = 'info' | 'warn' | 'error';

export interface ILoggerCommonFieldModel {
  ua: string; // user-agent
  url: string; // 当前页面地址
  browser: string; // 浏览器
  browserVersion: string; // 浏览器版本
  os: string; // 操作系统
  osVersion: string; // 操作系统版本
  device: string; // 设备: mobile、pad、desktop
  clientTime: string; // 客户端时间
  clientTimeStr: string; // 客户端时间字符串
  sessionId: string; // 会话 id
  sessionTime: number; // 会话时长
  sessionTimeString: string; // 会话时间
  [key: string]: any;
}

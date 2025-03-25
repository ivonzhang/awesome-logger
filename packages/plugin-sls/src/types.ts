export interface ISlsPluginConfig {
  host: string;
  project: string;
  logstore: string;
  /**
   * 发送时间阈值, default 10s
   */
  time?: number;
  /**
   * 发送条数阈值, default 10
   */
  count?: number;
  /**
   * 日志主题
   */
  topic?: string;
  /**
   * 日志来源
   */
  source?: string;
  /**
   * 日志标签
   */
  tags?: Record<string, any>;
  // installUnloadHook?: (hook: () => void) => void;
  // sendPayload: (...params: any[]) => Promise<void>;
  // /**
  //  * 上传异常回调
  //  */
  // onPutlogsError?: (payload: any, res: any) => void;
  /**
   * sts 模式并发控制
   */
  maxReqCount?: number;
}

export interface IMap {
  [key: string]: any;
}

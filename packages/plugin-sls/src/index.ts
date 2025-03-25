import { LogPlugin } from "@awesome-logger/core";
import { SlsWebTracker } from "./tracker";
import { IMap, ISlsPluginConfig } from "./types";

export class SLSLoPlugin extends LogPlugin {
  private slsTracker: SlsWebTracker;
  constructor(opts: ISlsPluginConfig) {
    super(opts);
    this.slsTracker = new SlsWebTracker(opts);
  }
  sendLog(logData: IMap) {
    console.log("Sending log to SLS:", logData);
    // 这里添加实际的 SLS 发送逻辑
    this.slsTracker.rowSend(logData);
  }
}

import SlsTracker from '@aliyun-sls/web-track-browser';
import { IMap, ISlsPluginConfig } from '../types';

export class SlsWebTracker {
  tracker: SlsTracker;
  constructor(config: ISlsPluginConfig) {
    this.tracker = new SlsTracker(config);
  }

  rowSend(data: IMap, immediately = false) {
    if (immediately) {
      this.tracker.sendImmediate(data);
    } else {
      this.tracker.send(data);
    }
  }
}

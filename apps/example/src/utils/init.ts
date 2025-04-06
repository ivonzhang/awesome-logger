import Client from '@awesome-logger/client';
import { Logger } from '@awesome-logger/core';
import MyCustomLogPlugin from '../plugin';

import { SLSLogPlugin } from '@awesome-logger/plugin-sls';

// create logger
const logger = new Logger({
  uid: 'test_user_1',
  release: '1.0.0',
  env: 'production',
});

// Configure basic fields
const client = new Client(logger);

// sls plugin
const slsPlugin = new SLSLogPlugin({
  host: 'cn-hangzhou.log.aliyuncs.com', // 公网域名
  project: 'awesome-logger', // log project
  logstore: 'plugin-sls-logstore', // logstore
  count: 20, // 发送条数阈值
  time: 3, // 发送时间阈值
});
client.usePlugin(slsPlugin);

// custom plugin
const customPlugin = new MyCustomLogPlugin(null);
client.usePlugin(customPlugin);

export { client };

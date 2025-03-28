import Client from '@awesome-logger/client';
import { Logger } from '@awesome-logger/core';
import MyCustomLogPlugin from '../plugin';

// import { SLSLogPlugin } from '@awesome-logger/plugin-sls';

// create logger 
const logger = new Logger({
  uid: 'test_user_1',
  release: '1.0.0',
  env: 'production',
});

// Configure basic fields
const client = new Client(logger);

// custom plugin
const customPlugin = new MyCustomLogPlugin(null);

client.usePlugin(customPlugin);

export { client };

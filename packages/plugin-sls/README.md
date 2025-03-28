# Plugin SLS Module

The `plugin-sls` module is a plugin for the **Awesome Logger** project. It provides seamless integration with Alibaba Cloud's Simple Log Service (SLS), enabling efficient and reliable log reporting.

## Features

- Easy integration with Alibaba Cloud SLS.
- Supports structured logging with custom fields.
- Reliable log delivery with plugin-based architecture.

## Installation

To install the `plugin-sls` module, use the following command:

```bash
npm install @awesome-logger/plugin-sls
```

## Usage

For detailed usage instructions, please refer to the [main README](https://github.com/ivonzhang/awesome-logger/blob/main/README.md).

## API Reference

Below is a table summarizing the key APIs provided by the `plugin-sls` module:

| API                | Description                                                                 | Parameters                                                                                     | Example                                                                                     |
|--------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| `SLSLogPlugin`     | Creates a new SLS log plugin instance.                                      | `options: { endpoint: string, accessKeyId: string, accessKeySecret: string, project: string, logstore: string }` | `const slsPlugin = new SLSLogPlugin({ endpoint: 'your-endpoint', accessKeyId: 'your-key', accessKeySecret: 'your-secret', project: 'your-project', logstore: 'your-logstore' });` |
| `sendLog()`        | Sends a log entry to Alibaba Cloud SLS.                                     | `logData: Record<string, any>`                                                                | `slsPlugin.sendLog({ key: 'log_key', data: { message: 'log message' } });`                 |

## Custom Plugin Development

The `plugin-sls` module leverages the `LogPlugin` abstract class from the **core** module, allowing developers to create custom plugins. Below is an example:

```typescript
import { LogPlugin } from '@awesome-logger/core';

class CustomLogPlugin extends LogPlugin {
  sendLog(logData: Record<string, any>) {
    // Custom log reporting logic
    console.log('Custom log service reporting:', logData);
    // Example: Send to a self-developed logging system
    fetch('https://your-log-service.com', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
  }
}

export default CustomLogPlugin;
```

To use the custom plugin:

```typescript
import Client from '@awesome-logger/client';
import CustomLogPlugin from './CustomLogPlugin';

const client = new Client();
const customPlugin = new CustomLogPlugin();
client.usePlugin(customPlugin);

client.info('This is a log reported by the custom plugin');
```

## License

This project is licensed under the [MIT License](../../LICENSE).

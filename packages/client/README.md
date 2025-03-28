# Client Package

The `client` package is a powerful and flexible component of the **Awesome Logger** project, designed to simplify logging for client-side applications. It offers a plugin-based architecture and built-in support for common reporting fields, making it an ideal choice for diverse scenarios and effective user issue troubleshooting.

## Features

- **Plugin-Based Architecture**: Easily extend functionality by integrating plugins for various logging needs.
- **Built-In Reporting Fields**: Automatically includes common fields like `release`, `env`, and `uid` for consistent and comprehensive logs.
- **Multi-Level Logging**: Supports `info`, `warn`, and `error` levels for granular log management.
- **Configurable Outputs**: Flexible options for output formats and destinations.
- **Seamless Ecosystem Integration**: Works effortlessly with the Awesome Logger ecosystem.

## Installation

Install the `client` package along with its dependencies using the following command:

```bash
npm install @awesome-logger/client @awesome-logger/core @awesome-logger/plugin-sls
```

## Built-In Fields

The `client` package automatically includes the following built-in fields in every log, ensuring comprehensive and standardized logging:

| Field           | Type                | Description                                      |
|------------------|---------------------|--------------------------------------------------|
| `uid`           | string \| number    | User's unique identifier                        |
| `release`       | string              | Frontend application version                    |
| `env`           | string              | Environment: local, pre, prod                   |
| `type`          | string              | Log type: info, warn, error                     |
| `key`           | string              | Log key to identify a log record                |
| `data`          | Record<string, any> | Data associated with the log key                |
| `ua`            | string              | Browser's user agent information                |
| `url`           | string              | Current page URL                                |
| `os`            | string              | Operating system of the device                  |
| `osVersion`     | string              | Operating system version                        |
| `traceId`       | string              | UUID for tracing issues across systems          |
| `sessionId`     | string              | Session ID for grouping logs within a session   |
| `browser`       | string              | Browser name: Chrome, Safari, etc.             |
| `browserVersion`| string              | Browser version information                     |
| `container`     | string              | Container info: browser, dingtalk, etc.         |
| `device`        | string              | Device type: phone, desktop, etc.              |
| `clientTime`    | string \| number    | Client-side timestamp                           |

## Usage

Below is an example demonstrating the ease of use and powerful capabilities of the `client` package with the `sls` plugin:

```javascript
import Client from '@awesome-logger/client';
import { SLSLogPlugin } from '@awesome-logger/plugin-sls';

// Configure base fields for all logs
const client = new Client({
  baseFields: {
    release: '0.1.0',
    env: 'production',
    uid: 'user_123'
  }
});

// Register the Alibaba Cloud SLS plugin
const slsPlugin = new SLSLogPlugin({
  endpoint: 'your-sls-endpoint',
  accessKeyId: 'your-access-key-id',
  accessKeySecret: 'your-access-key-secret',
  project: 'your-project',
  logstore: 'your-logstore'
});
client.usePlugin(slsPlugin);

// Log an informational message
client.info('enter_home_page', { page: 'home' });

// Log a warning
client.warn('api_timeout', { latency: 500 });

// Log an error
client.error('api_fail', { errorCode: 500, endpoint: '/api/data' });
```

## Documentation

For detailed documentation and advanced usage, please refer to the [main project README](https://github.com/ivonzhang/awesome-logger/blob/main/README.md).

## Contributing

We welcome contributions! Please follow the guidelines outlined in the main project repository.

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/ivonzhang/awesome-logger/blob/main/LICENSE) file for details.

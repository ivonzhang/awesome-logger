# awesome-logger - A Flexible and Extensible Frontend Logging Solution

[English](README.md) | [中文](README.zh-cn.md)

![License](https://img.shields.io/badge/license-MIT-blue.svg)

**awesome-logger** is an efficient logging tool designed for frontend developers, focusing on flexibility, extensibility, and developer experience. With built-in standardized log fields, a plugin-based architecture, and multi-dimensional log management, it helps developers quickly implement log collection, reporting, and analysis, improving application stability and troubleshooting efficiency.

---

## 🎯 Use Cases

awesome-logger provides precise solutions for various development needs, suitable for the following scenarios:

1. **Quickly Locate User Issues**  
- **Core Advantage**: Built-in fields like `os`, `device`, and `ua` automatically collect complete context.  
- **Typical Scenario**: When users report anomalies, logs can be filtered in real-time (e.g., Alibaba Cloud SLS) to pinpoint device, operation path, and other information within seconds.

2. **Application Health Monitoring**  
- **Core Advantage**: Supports log levels like `info`, `warn`, and `error`, aiding in stability dashboard construction.  
- **Typical Scenario**: Real-time monitoring of API error rates, memory leaks, etc., to quickly identify potential application risks.

3. **Homogeneous Reporting to Multiple Log Systems**  
- **Core Advantage**: Plugin-based architecture supports simultaneous integration with multiple services like Alibaba Cloud SLS and Tencent Cloud CLS.  
- **Typical Scenario**: Cross-cloud deployment projects or transitioning between old and new logging systems, enabling one-time reporting to multiple platforms.

4. **Custom Log Extensions**  
- **Core Advantage**: Customize reporting logic via the `LogPlugin` interface (e.g., private systems, data encryption).  
- **Typical Scenario**: Enterprise private deployments or sensitive data handling (financial/medical scenarios).

5. **Efficient Development and Standardization**  
- **Core Advantage**: Out-of-the-box mainstream plugins (SLS/CLS) allow initialization in 10 lines of code.  
- **Typical Scenario**: Startups or agile development teams reduce redundant infrastructure development.

Through lightweight design and flexible extensions, awesome-logger helps developers balance efficiency, stability, and observability.

---

## 🌟 Key Advantages

1. **Built-in standardized log fields for efficient troubleshooting**  
   Predefined key environment fields such as `os` (operating system), `device` (device model), and `ua` (user agent) allow comprehensive context collection without additional development, helping developers quickly pinpoint the root cause of issues.

2. **Flexible configuration of basic fields, supporting real-time query and analysis**  
   Users can customize basic fields (e.g., `uid`, `env`), which are automatically appended to each log. Combined with services like Alibaba Cloud SLS, this enables real-time log filtering and querying, accurately identifying user feedback scenarios.

3. **Multi-level log management for application health monitoring**  
   Supports multiple log levels such as `info`, `warn`, and `error`, helping developers build stability dashboards and monitor application health in real-time. Categorizing logs by level allows quick identification of potential risks and anomalies.

4. **Plugin-based architecture for seamless integration with any logging service**  
   With a plugin mechanism, developers can freely extend logging capabilities. Built-in support for major logging services like Alibaba Cloud SLS and Tencent Cloud CLS is provided, along with the ability to create custom plugins for private logging systems or other third-party services.

---

## 📦 Architecture Design

awesome-logger adopts a layered architecture to ensure functional decoupling and extensibility:

1. **Core Layer (`@awesome-logger/core`)**  
   - **Logger Class**: Manages log generation, level control, and plugin registration. Provides methods like `info`, `warn`, and `error`, supporting basic field configuration.
   - **LogPlugin Abstract Class**: Defines plugin development specifications. All plugins must implement the `sendLog` method to send log data to the target service.

2. **Plugin Layer (`@awesome-logger/plugin-*`)**  
   Provides implementations for specific logging services. For example:
   - `@awesome-logger/plugin-sls`: Integrates with Alibaba Cloud SLS logging service.
   Developers can customize plugins according to specifications to extend logging capabilities.

3. **Usage Layer (`@awesome-logger/client`)**  
   - **Client Class**: Encapsulates core functionality to simplify user integration. Supports plugin registration via `usePlugin` and provides a unified logging interface.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install @awesome-logger/client @awesome-logger/core @awesome-logger/plugin-sls
```

### 2. Initialization and Configuration
```typescript
import Client from '@awesome-logger/client';
import { Logger } from '@awesome-logger/core';
import { SLSLogPlugin } from '@awesome-logger/plugin-sls';

// create logger 
const logger = new Logger({
  uid: 'test_user_1',
  release: '1.0.0',
  env: 'production',
});

// you can also use logger.setBaseField function for some async scene
logger.setBaseField({ uid: 'user_001' });

// Configure basic fields
const client = new Client(logger);

// Register Alibaba Cloud SLS plugin
const slsPlugin = new SLSLogPlugin({
  host: 'your-sls-endpoint', // 公网域名
  project: 'your-project',
  logstore: 'your-logstore',
  count: 20, // 发送条数阈值
  time: 3, // 发送时间阈值
});
client.usePlugin(slsPlugin);
```

### 3. Log Reporting
```typescript
// Report info log
client.info('enter_home_page', { page: 'home' });

// Report warning log
client.warn('api_timeout', { latency: 500 });

// Report error log
client.error('api_fail', { errorCode: 500, endpoint: '/api/data' });
```

### 4. Log to Alibaba Cloud SLS
The effect is as shown below:
<a href="https://ivonzhang.github.io/awesome-logger/images/plugin-sls-test.gif" target="_blank">
  🔥 click to view the gif（open in the new tab）
</a>

![sls-demo](https://ivonzhang.github.io/awesome-logger/images/sls-error-demo.png)



> Attention
1. Before using the plugin-sls, you need to create an Alibaba Cloud account.
2. Activate the SLS logging service, which offers a free trial for one month with 50GB of storage.
3. Create a log project.
4. Then create a logstore (for frontend reporting, remember to enable the web tracking option).
5. After reporting some logs, you can create an index.
6. Indexes support settings, additions, and overwrites.

---

## 🛠️ Custom Plugin Development

**awesome-logger** supports custom plugin development, enabling seamless integration with private logging systems or other services:

1. **Create a Plugin Class**
```typescript
import { LogPlugin } from '@awesome-logger/core';

class CustomLogPlugin extends LogPlugin {
  sendLog(logData: Record<string, any>) {
    // Custom log reporting logic
    console.log('Custom log service reporting:', logData);
    // Example: Send to a self-developed logging system
    fetch('https://your-log-service.com', {
      method: 'POST',
      body: JSON.stringify(logData)
    });
  }
}

export default CustomLogPlugin;
```

2. **Use the Custom Plugin**
```typescript
import Client from '@awesome-logger/client';
import CustomLogPlugin from './CustomLogPlugin';

const client = new Client();
const customPlugin = new CustomLogPlugin({ /* Custom configuration */ });
client.usePlugin(customPlugin);

client.info('click', { message: 'click button' });
```

3. **The effect is as shown below:**

![demo](https://ivonzhang.github.io/awesome-logger/images/custom-log-demo.gif)

---

## Built-in Log Fields
|Field|Type|Description|
|-|-|-|
|uid|string | number|User UID|
|release|string|Frontend application version|
|env|string|Environment: local, pre, prod|
|type|string|Type, such as log level: info, warn, error|
|key|string|Log key, used to identify a log record|
|data|Record<string, any> | string|Data corresponding to the log key|
|ua|string|Browser navigator.userAgent information|
|url|string|Current page URL information|
|os|string|Operating system information of the current device|
|osVersion|string|Operating system version of the current device|
|traceId|string|UUID agreed upon by frontend and backend for issue tracking|
|sessionId|string|Session ID, used to distinguish logs within the same session|
|browser|string|Browser: Chrome, Safari, iOS Safari, etc.|
|browserVersion|string|Browser version information|
|container|string|Container where the page runs, e.g., DingTalk, browser|
|device|string|Device type, e.g., phone, desktop|
|clientTime|string | number|Client timestamp|

---

## 🤝 Contribution and Feedback
We welcome community contributions! If you have feature suggestions, bug reports, or want to participate in development, please submit a [GitHub Issue](https://github.com/ivonzhang/awesome-logger/issues) or Pull Request.

---

## 📄 License
**awesome-logger** is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

With awesome-logger, you can easily achieve standardized, observable, and flexible frontend logging, making logs a powerful aid for your application's stability!

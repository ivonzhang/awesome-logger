

# awesome-logger - 灵活可扩展的前端日志上报解决方案

![License](https://img.shields.io/badge/license-MIT-blue.svg)

**awesome-logger** 是一款为前端开发者设计的高效日志上报工具，专注于灵活性、可扩展性和开发者体验。通过内置标准化日志字段、插件化架构以及多维度日志管理，帮助开发者快速实现日志收集、上报与分析，提升应用稳定性与问题排查效率。

---

## 🌟 核心优势

1. **内置标准化日志字段，助力高效排查**  
   预定义了如 `os`（操作系统）、`device`（设备型号）、`ua`（用户代理）等关键环境字段，无需额外开发即可收集全面的上下文信息，帮助开发者快速定位问题根源。

2. **基础字段灵活配置，支持实时查询分析**  
   允许用户自定义基础字段（如 `uid`、`env` 等），这些字段会自动附加到每条日志中。结合阿里云 SLS 等日志服务，可实现日志的实时过滤与查询，精准定位用户反馈的问题场景。

3. **多等级日志管理，构建应用健康监控**  
   支持 `info`、`warn`、`error` 等多种日志等级，帮助开发者建立稳定性大盘，实时监控应用健康状态。通过不同等级的日志分类，可快速识别潜在风险与异常。

4. **插件化架构设计，轻松对接任意日志服务**  
   采用插件化机制，开发者可自由扩展日志上报能力。内置对阿里云 SLS、腾讯云 CLS 等主流日志服务的支持，同时允许自定义插件，适配私有日志系统或其他第三方服务。

---

## 📦 架构设计

awesome-logger 采用分层架构，确保功能解耦与扩展性：

1. **核心层（`@awesome-logger/core`）**  
   - **Logger 类**：管理日志的生成、等级控制及插件注册。提供 `info`、`warn`、`error` 等方法，支持基础字段配置。
   - **LogPlugin 抽象类**：定义插件开发规范。所有插件需实现 `sendLog` 方法，负责将日志数据发送到目标服务。

2. **插件层（`@awesome-logger/plugin-*`）**  
   提供具体日志服务的实现。例如：
   - `@awesome-logger/plugin-sls`：对接阿里云 SLS 日志服务。
   开发者可根据规范自定义插件，扩展日志上报能力。

3. **使用层（`@awesome-logger/client`）**  
   - **Client 类**：封装核心功能，简化用户接入。支持通过 `usePlugin` 注册插件，并提供统一的日志上报接口。

---

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install @awesome-logger/client @awesome-logger/core @awesome-logger/plugin-sls
```

### 2. 初始化与配置
```typescript
import Client from '@awesome-logger/client';
import { SLSLogPlugin } from '@awesome-logger/plugin-sls';

// 配置基础字段
const client = new Client({
  baseFields: {
    appName: 'my-awesome-app',
    env: 'production',
    uid: 'user_123'
  }
});

// 注册阿里云 SLS 插件
const slsPlugin = new SLSLogPlugin({
  endpoint: 'your-sls-endpoint',
  accessKeyId: 'your-access-key-id',
  accessKeySecret: 'your-access-key-secret',
  project: 'your-project',
  logstore: 'your-logstore'
});
client.usePlugin(slsPlugin);
```

### 3. 上报日志
```typescript
// 上报信息日志
client.info('enter_home_page', { page: 'home' });

// 上报警告日志
client.warn('api_timeout', { latency: 500 });

// 上报错误日志
client.error('api_fail', { errorCode: 500, endpoint: '/api/data' });
```

---

## 🛠️ 自定义插件开发

**awesome-logger** 支持开发者自定义插件，轻松对接私有日志系统或其他服务：

1. **创建插件类**
```typescript
import { LogPlugin } from '@awesome-logger/core';

class CustomLogPlugin extends LogPlugin {
  sendLog(logData: Record<string, any>) {
    // 自定义日志上报逻辑
    console.log('自定义日志服务上报:', logData);
    // 示例：发送到自研日志系统
    fetch('https://your-log-service.com', {
      method: 'POST',
      body: JSON.stringify(logData)
    });
  }
}

export default CustomLogPlugin;
```

2. **使用自定义插件**
```typescript
import Client from '@awesome-logger/client';
import CustomLogPlugin from './CustomLogPlugin';

const client = new Client();
const customPlugin = new CustomLogPlugin({ /* 自定义配置 */ });
client.usePlugin(customPlugin);

client.info('这是一条自定义插件上报的日志');
```

---

## 🤝 贡献与反馈
我们欢迎社区贡献！如果您有功能建议、bug 反馈或想参与开发，请提交 [GitHub Issue](https://github.com/ivonzhang/awesome-logger/issues) 或 Pull Request。

---

## 📄 许可证
**awesome-logger** 采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

通过 awesome-logger，您可以轻松实现前端日志的标准化、可观测性与灵活上报，让日志成为您应用稳定性的强大助力！
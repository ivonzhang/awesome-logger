# awesome-logger - 灵活可扩展的前端日志解决方案

[English](README.md) | [中文](README.zh-cn.md)

![License](https://img.shields.io/badge/license-MIT-blue.svg)

**awesome-logger** 是一款为前端开发者设计的高效日志工具，专注于灵活性、可扩展性和开发者体验。通过内置标准化日志字段、插件化架构以及多维度日志管理，帮助开发者快速实现日志收集、上报与分析，提升应用稳定性与问题排查效率。

---


### 🎯 适用场景  

awesome-logger 针对不同开发需求，提供精准解决方案，适合以下场景：  

1. **快速定位用户问题**  
- **核心优势**：内置 `os`、`device`、`ua` 等环境字段，自动采集完整上下文。  
- **典型场景**：用户反馈异常时，通过日志实时过滤（如阿里云 SLS）秒级定位设备、操作路径等信息。  

2. **应用健康度监控**  
- **核心优势**：支持 `info/warn/error` 等级日志，助力稳定性大盘构建。  
- **典型场景**：实时监控接口报错率、内存泄漏等，快速识别应用潜在风险。  

3. **多日志系统同构上报**  
- **核心优势**：插件化架构支持同时接入阿里云 SLS、腾讯云 CLS 等多服务。  
- **典型场景**：跨云部署项目、新旧日志系统过渡，一次上报同步多平台。  

4. **自定义日志扩展**  
- **核心优势**：通过 `LogPlugin` 接口自定义上报逻辑（如私有系统、数据加密）。  
- **典型场景**：企业私有化部署、敏感数据处理（金融/医疗场景）。  

5. **高效开发与标准化**  
- **核心优势**：开箱即用主流插件（SLS/CLS），10 行代码完成初始化。  
- **典型场景**：初创项目、敏捷开发团队，减少基础设施重复开发。  

通过轻量化设计与灵活扩展，awesome-logger 帮助开发者在效率、稳定性、可观测性之间实现平衡。

---

## 🌟 核心优势

1. **内置标准化日志字段，助力高效排查**  
   预定义了如 `os`（操作系统）、`device`（设备型号）、`ua`（用户代理）等关键环境字段，无需额外开发即可收集全面的上下文信息，帮助开发者快速定位问题根源。

2. **基础字段灵活配置，支持实时查询分析**  
   允许用户自定义基础字段（如 `uid`、`env` 等），这些字段会自动附加到每条日志中。结合阿里云 SLS 等服务，可实现日志的实时过滤与查询，精准定位用户反馈场景。

3. **多等级日志管理，构建应用健康监控**  
   支持 `info`、`warn`、`error` 等多种日志等级，帮助开发者建立稳定性大盘，实时监控应用健康状态。通过不同等级的日志分类，可快速识别潜在风险与异常。

4. **插件化架构设计，轻松对接任意日志服务**  
   采用插件机制，开发者可自由扩展日志能力。内置支持阿里云 SLS、腾讯云 CLS 等主流日志服务，同时允许自定义插件，适配私有日志系统或其他第三方服务。

---

## 📦 架构设计

awesome-logger 采用分层架构，确保功能解耦与扩展性：

1. **核心层（`@awesome-logger/core`）**  
   - **Logger 类**：管理日志生成、等级控制及插件注册。提供 `info`、`warn`、`error` 等方法，支持基础字段配置。
   - **LogPlugin 抽象类**：定义插件开发规范。所有插件需实现 `sendLog` 方法，将日志数据发送到目标服务。

2. **插件层（`@awesome-logger/plugin-*`）**  
   提供具体日志服务的实现。例如：
   - `@awesome-logger/plugin-sls`：对接阿里云 SLS 日志服务。
   开发者可根据规范自定义插件，扩展日志能力。

3. **使用层（`@awesome-logger/client`）**  
   - **Client 类**：封装核心功能，简化用户接入。支持通过 `usePlugin` 注册插件，并提供统一的日志接口。

---

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install @awesome-logger/client @awesome-logger/core @awesome-logger/plugin-sls
```

### 2. 初始化与配置
```typescript
import Client from '@awesome-logger/client';
import { Logger } from '@awesome-logger/core';
import { SLSLogPlugin } from '@awesome-logger/plugin-sls';

// 创建 Logger 实例
const logger = new Logger({
  uid: 'test_user_1',
  release: '1.0.0',
  env: 'production',
});

// 也可以使用 logger.setBaseField 方法处理异步场景
logger.setBaseField({ uid: 'user_001' });

// 配置基础字段
const client = new Client(logger);

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

### 3. 日志上报
```typescript
// 上报信息日志
client.info('enter_home_page', { page: 'home' });

// 上报警告日志
client.warn('api_timeout', { latency: 500 });

// 上报错误日志
client.error('api_fail', { errorCode: 500, endpoint: '/api/data' });
```

### 4. 日志上报到阿里云 SLS
效果如下图:<a href="https://ivonzhang.github.io/awesome-logger/images/plugin-sls-test.gif" target="_blank">
  🔥 点击查看插件测试动画 gif（新标签页打开）
</a>

![sls-demo](https://ivonzhang.github.io/awesome-logger/images/sls-error-demo.png)



> 注意事项
1. 在使用 plugin-sls 之前，您需要创建一个阿里云账户。
2. 开通 SLS 日志服务，支持免费试用一个月，50GB 容量。
3. 创建一个日志项目（log project）。
4. 然后创建一个日志库（logstore，前端上报时记得开启 Web Tracking 选项）。
5. 上报一些日志后，方可创建索引。
6. 索引支持设置、追加和覆盖。

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

client.info('click', { message: 'click button' });
```

3. **效果如下图:**

![demo](https://ivonzhang.github.io/awesome-logger/images/custom-log-demo.gif)

---

## 日志内置字段
|字段|类型|说明|
|-|-|-|
|uid|string | number|用户 UID|
|release|string|前端应用版本号|
|env|string|环境：local、pre、prod|
|type|string|类型，如日志等级：info、warn、error|
|key|string|日志 key，用以标识一条日志记录|
|data|Record<string, any> | string|日志 key 对应的数据|
|ua|string|浏览器 navigator.userAgent 信息|
|url|string|当前页面的 URL 信息|
|os|string|当前设备的操作系统信息|
|osVersion|string|当前设备的操作系统版本|
|traceId|string|前后端约定的 UUID，用以追踪问题|
|sessionId|string|会话 ID，用以区分同一会话范围内的日志|
|browser|string|浏览器：Chrome、Safari、iOS Safari 等|
|browserVersion|string|浏览器版本信息|
|container|string|页面运行所在容器信息，如：钉钉、浏览器|
|device|string|设备类型，如：手机、桌面端|
|clientTime|string | number|客户端时间戳|

---

## 🤝 贡献与反馈
我们欢迎社区贡献！如果您有功能建议、Bug 反馈或想参与开发，请提交 [GitHub Issue](https://github.com/ivonzhang/awesome-logger/issues) 或 Pull Request。

---

## 📄 许可证
**awesome-logger** 采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

通过 awesome-logger，您可以轻松实现前端日志的标准化、可观测性与灵活上报，让日志成为您应用稳定性的强大助力！

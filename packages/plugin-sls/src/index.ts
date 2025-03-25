import { LogPlugin } from '@awesome-logger/core';

export class SLSLoPlugin extends LogPlugin {
    sendLog(logData: Record<string, any>) {
        const { endpoint, accessKeyId, accessKeySecret, project, logstore } = this.options;
        console.log('Sending log to SLS:', logData);
        // 这里添加实际的 SLS 发送逻辑
    }
}    
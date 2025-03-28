import { LogPlugin } from '@awesome-logger/core';

class MyCustomLogPlugin extends LogPlugin {
  sendLog(logData: Record<string, unknown>) {
    // Custom log reporting logic
    console.log('Custom log service reporting:', logData);
    // Example: Send to a self-developed logging system
    // fetch('https://your-log-service.com', {
    //   method: 'POST',
    //   body: JSON.stringify(logData)
    // });
  }
}

export default MyCustomLogPlugin;
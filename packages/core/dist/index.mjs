// src/logger/index.ts
var Logger = class {
  baseFields;
  plugins = [];
  constructor(baseFields = {}) {
    this.baseFields = baseFields;
  }
  use(plugin) {
    this.plugins.push(plugin);
    return this;
  }
  log(level, message, customFields = {}) {
    const logData = {
      ...this.baseFields,
      level,
      message,
      ...customFields
    };
    this.sendLog(logData);
  }
  sendLog(logData) {
    this.plugins.forEach((plugin) => {
      plugin(logData);
    });
  }
  info(message, customFields) {
    this.log("info", message, customFields);
  }
  warn(message, customFields) {
    this.log("warn", message, customFields);
  }
  error(message, customFields) {
    this.log("error", message, customFields);
  }
};

// src/plugin/index.ts
var LogPlugin = class {
  options;
  constructor(options) {
    this.options = options;
  }
};
export {
  LogPlugin,
  Logger
};

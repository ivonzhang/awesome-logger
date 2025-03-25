var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  LogPlugin: () => LogPlugin,
  Logger: () => Logger
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LogPlugin,
  Logger
});

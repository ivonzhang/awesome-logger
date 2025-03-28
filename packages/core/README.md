# Core Module

The `core` module is the heart of the **Awesome Logger** project. It provides the foundational logging utilities and APIs that other modules build upon. This module is designed to be lightweight, flexible, and highly extensible, making it suitable for a wide range of logging use cases.

## Features

- Core logging functionality.
- Customizable log levels.
- Extensible log formatters and transports.
- Lightweight and dependency-free.

## Installation

To install the `core` module, use the following command:

```bash
npm install @awesome-logger/core
```

## Usage

For detailed usage instructions, please refer to the [main README](https://github.com/ivonzhang/awesome-logger/blob/main/README.md).

## API Reference

### Logger

The `Logger` class is the central component for managing logs. Below are its key methods and properties:

| API                | Description                                                                 | Parameters                                                                                     | Example                                                                                     |
|--------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| `Logger`           | Creates a new logger instance.                                             | `baseFields: { uid: string, release: string, env: string }`                                   | `const logger = new Logger({ uid: 'user_123', release: '1.0.0', env: 'production' });`      |
| `use()`            | Registers a plugin for log handling.                                       | `plugin: LogPlugin`                                                                           | `logger.use(new CustomPlugin());`                                                          |
| `setBaseField()`   | Dynamically updates base fields for the logger instance.                   | `fields: Partial<{ uid: string, release: string, env: string }>`                              | `logger.setBaseField({ env: 'staging' });`                                                 |
| `info()`           | Logs an informational message.                                             | `key: string, data?: Record<string, any>`                                                     | `logger.info('user_login', { username: 'test_user' });`                                    |
| `warn()`           | Logs a warning message.                                                    | `key: string, data?: Record<string, any>`                                                     | `logger.warn('api_latency', { latency: 500 });`                                            |
| `error()`          | Logs an error message.                                                     | `key: string, data?: Record<string, any>`                                                     | `logger.error('api_failure', { errorCode: 500 });`                                         |

### LogPlugin

The `LogPlugin` is an abstract class that defines the structure for creating custom plugins. Below is its key method:

| API                | Description                                                                 | Parameters                                                                                     | Example                                                                                     |
|--------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| `sendLog()`        | Abstract method for sending log data.                                       | `logData: Record<string, any>`                                                                | `class CustomPlugin extends LogPlugin { sendLog(logData) { console.log(logData); } }`      |


## License

This project is licensed under the [MIT License](../../LICENSE).

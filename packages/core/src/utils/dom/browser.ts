// 获取操作系统和浏览器相关信息

export enum Browser {
  Chrome = "chrome",
  Firefox = "firefox",
  Safari = "safari",
  IE = "ie",
  Edge = "edge",
  UC = "uc",
  iOS_Safari = "ios_safari",
  Opera = "opera",
  Samsung = "samsung",
  Unknown = "unknown",
}

/**
 * 判断是否是浏览器环境
 */
export const testUserAgent = (regexp: RegExp): boolean =>
  typeof window !== "undefined" && regexp.test(window.navigator.userAgent);

/**
 * 检测浏览器类型
 */
export function detectBrowser(): Browser {
  switch (true) {
    case testUserAgent(/chrome|chromium|crios/i):
      return Browser.Chrome;
    case testUserAgent(/firefox/i):
      return Browser.Firefox;
    case testUserAgent(/safari/i) && testUserAgent(/iphone|ipad|ipod/i):
      return Browser.iOS_Safari;
    case testUserAgent(/safari/i):
      return Browser.Safari;
    case testUserAgent(/msie|trident/i):
      return Browser.IE;
    case testUserAgent(/edge/i):
      return Browser.Edge;
    case testUserAgent(/opr/i):
      return Browser.Opera;
    case testUserAgent(/ucbrowser/i):
      return Browser.UC;
    case testUserAgent(/samsungbrowser/i):
      return Browser.Samsung;
    default:
      return Browser.Unknown;
  }
}

/**
 * 检测浏览器版本号
 */
export function detectBrowserVersion(browser: Browser): string {
  const userAgent = window.navigator.userAgent;

  switch (browser) {
    case Browser.Chrome:
      return userAgent.match(/(?:chrome|crios)\/([\d.]+)/i)?.[1] || "Unknown";
    case Browser.Firefox:
      return userAgent.match(/firefox\/([\d.]+)/i)?.[1] || "Unknown";
    case Browser.Safari:
      return userAgent.match(/version\/([\d.]+)/i)?.[1] || "Unknown";
    case Browser.IE:
      return userAgent.match(/(?:msie |rv:)([\d.]+)/i)?.[1] || "Unknown";
    case Browser.Edge:
      return userAgent.match(/edg\/([\d.]+)/i)?.[1] || "Unknown";
    case Browser.Opera:
      return userAgent.match(/opr\/([\d.]+)/i)?.[1] || "Unknown";
    case Browser.UC:
      return userAgent.match(/ucbrowser\/([\d.]+)/i)?.[1] || "Unknown";
    case Browser.Samsung:
      return userAgent.match(/samsungbrowser\/([\d.]+)/i)?.[1] || "Unknown";
    default:
      return "Unknown";
  }
}

export const browser = detectBrowser();
export const browserVersion = detectBrowserVersion(browser);

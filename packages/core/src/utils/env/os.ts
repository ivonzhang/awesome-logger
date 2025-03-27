const userAgent = navigator.userAgent;

export function getOSInfo() {
  let os = 'Unknown';
  let version = 'Unknown';

  if (isWin) {
    os = 'Windows';
    const versionMatch = userAgent.match(/Windows NT (\d+\.\d+)/);
    if (versionMatch) version = versionMatch[1];
  } else if (isMac) {
    os = 'Mac';
    const versionMatch = userAgent.match(/Mac OS X (\d+_\d+(_\d+)?)/);
    if (versionMatch) version = versionMatch[1].replace(/_/g, '.');
  } else if (isAndroid) {
    os = 'Android';
    const versionMatch = userAgent.match(/Android (\d+(\.\d+)?)/);
    if (versionMatch) version = versionMatch[1];
  } else if (isIOS) {
    os = 'iOS';
    const versionMatch = userAgent.match(/OS (\d+_\d+(_\d+)?)/);
    if (versionMatch) version = versionMatch[1].replace(/_/g, '.');
  }

  return { os, version };
}

export const isWin = /Windows NT/.test(userAgent);
export const isMac = /Mac OS X/.test(userAgent);
export const isAndroid = /Android/.test(userAgent);
export const isIOS = /iPhone|iPad|iPod/.test(userAgent);

export function getDeviceType() {
  if (isAndroid || isIOS) {
    return 'phone';
  } else if (/iPad|Tablet/i.test(userAgent)) {
    return 'tablet';
  } else if (isWin || isMac) {
    return 'desktop';
  }
  return 'other';
}

const device = getDeviceType();
const { os, version } = getOSInfo();

export { os, version, device };

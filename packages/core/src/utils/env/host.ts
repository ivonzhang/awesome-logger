import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

export const clientSessionId = nanoid();
export const clientSessionTime = Date.now();
export const clientSessionTimeStr = dayjs(clientSessionTime).format('MM-DD HH:mm:ss');

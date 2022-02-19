import { refreshToken } from './api';
 
export async function isAuthorizedUser(): Promise<string> {
  if (localStorage.getItem('refreshToken') && localStorage.getItem('userId')) {
    const id = localStorage.getItem('userId')!;
    const token = localStorage.getItem('refreshToken')!;
    const enterTime = Number(localStorage.getItem('enterTime'))!;
    const EXPIPES_IN = 14400;
    
    if (enterTime <= enterTime + EXPIPES_IN * 1000) { 
      try {
        const result = await refreshToken(id, token);

        return 'ok';
      } catch (e: unknown) {
        return 'redirect';
      }
    } else {
      return 'ok';
    }
  } else {
    return 'redirect';
  }
}

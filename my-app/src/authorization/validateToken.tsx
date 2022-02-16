import { refreshToken } from './api';
 
export async function isAuthorizedUser() {

  if (localStorage.getItem('refreshToken') && localStorage.getItem('userId')) {
    const id = localStorage.getItem('userId')!;
    const token = localStorage.getItem('userId')!;
    const enterTime = Number(localStorage.getItem('enterTime'))!;
    const EXPIPES_IN = 14400;
    
    if (enterTime >= enterTime + EXPIPES_IN * 1000) { 
      try {
        const result = await refreshToken(id, token);
        console.log('Токен обновлен');
      } catch (e: unknown) {
        console.log('Какая-то ошибка');
      }
    }
  } else {
    console.log('Вы не авторизованы');
  }
}

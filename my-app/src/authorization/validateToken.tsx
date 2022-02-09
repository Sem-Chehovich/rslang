import { refreshToken } from './api';
import { useNavigate } from 'react-router-dom';
 
export async function isAuthorizedUser() {
  if (localStorage.getItem('refreshToken') && localStorage.getItem('userId')) {
    const id = localStorage.getItem('userId')!;
    const token = localStorage.getItem('userId')!;
    const EXPIPES_IN = 14400;

    if (Date.now() >= EXPIPES_IN * 1000) { 
      console.log('Время жизни истекло');
      try {
        const result = await refreshToken(id, token);
        localStorage.setItem('userToken', String(result.token));
        localStorage.setItem('refreshToken', String(result.refreshToken));
      } catch (e: unknown) {
        const navigate = useNavigate();
        navigate('/authorization');
      }
    }
  } 
}
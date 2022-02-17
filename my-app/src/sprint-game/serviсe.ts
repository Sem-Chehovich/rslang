import { isAuthorizedUser } from "../authorization/validateToken";
import { IUserWord } from "../interface/interface";
import { getCorrectUrl } from "../utilities/utilities";

export function checkUser() {
  if (localStorage.getItem('userId')) {
    isAuthorizedUser();

    return 'authorized';
  }

  return 'unauthorized';
}

export async function getUserWord(wordId: string): Promise<IUserWord | number> {
  const userId = localStorage.getItem('userId')!;
  const url = getCorrectUrl(`users/${userId}/words/${wordId}`);
  const userToken = localStorage.getItem('userToken')!;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    return response.status;
  }

  const result = await response.json() as IUserWord;
  return result;
}

export async function createUserWord(wordId: string, wordOptional: IUserWord) {
  const userId = localStorage.getItem('userId')!;
  const url = getCorrectUrl(`users/${userId}/words/${wordId}`);
  const userToken = localStorage.getItem('userToken')!;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(wordOptional)
  });

  return response.status;
}

export async function updateUserWord(wordId: string, wordOptional: IUserWord) {
  const userId = localStorage.getItem('userId')!;
  const url = getCorrectUrl(`users/${userId}/words/${wordId}`);
  const userToken = localStorage.getItem('userToken')!;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(wordOptional)
  });

  return response.status;
}

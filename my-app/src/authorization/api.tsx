const url = 'https://rs-lang-rs-school.herokuapp.com';

const userLogUp = `${url}/users`;
const userLogIn = `${url}/signin`;

export interface IUser {
  name?: string,
  email: string,
  password: string
}

export async function signUpUser(user: IUser) {
  const response = await fetch(userLogUp, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).catch();

  if (!response.ok) return response.status;
  const result = await response.json();

  return result;
};

export async function signInUser(user: IUser) {
  const response = await fetch(userLogIn, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).catch();

  if (!response.ok) {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('enterTime');
    return response.status;
  }

  const result = await response.json();

  localStorage.setItem('userName', String(result.name));
  localStorage.setItem('userId', String(result.userId));
  localStorage.setItem('userToken', String(result.token));
  localStorage.setItem('refreshToken', String(result.refreshToken));
  localStorage.setItem('enterTime', String(Date.now()));

  return result;
};

export async function refreshToken(userId: string, refToken: string) {
  const response = await fetch(`${userLogUp}/${userId}/tokens`,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${refToken}`,
    }
  })

  if (response.ok) {
    const result = await response.json();
    localStorage.setItem('userToken', String(result.token));
    localStorage.setItem('refreshToken', String(result.refreshToken));
    localStorage.setItem('enterTime', String(Date.now()));

    return result;
  }

  return response;
}

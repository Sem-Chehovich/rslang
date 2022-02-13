const url = 'https://rs-lang-rs-school.herokuapp.com';

const words = `${url}/words`;

export async function getWords(group: string, page: string) {
  const response = await fetch(`${words}?group=${group}&page=${page}`);

  if (response.ok) {
    const result = await response.json();
    // const wordsArr = JSON.stringify(result);
    // localStorage.setItem('words', wordsArr);
    
    return result;
  }

  return response;
}
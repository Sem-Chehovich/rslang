import { Dispatch } from 'react';
import { IResult, IWord, SprintAction, SprintActionTypes } from '../../types/sprint';


function shuffle(array: IWord[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const url = 'https://rs-lang-rs-school.herokuapp.com';

const words = `${url}/words`;

export async function getWords(group: number) {
  const response = await fetch(`${words}?group=${group}&page=${0}`);

  if (response.ok) {
    const result = await response.json();
    
    return result;
  }

  return response;
}

export const fetchWords = (group: number) => {

  return async (dispatch: Dispatch<SprintAction>) => {
    try {
      dispatch({ type: SprintActionTypes.FETCH_WORDS });
      const wordList = await getWords(group);
      dispatch({ type: SprintActionTypes.FETCH_WORDS_SUCCESS, payload: shuffle(wordList) });
    } catch (e) {
      console.log('Какая-то ошибка');
    } 
  }
}
export function setGroup(group: number): SprintAction {
  return { type: SprintActionTypes.SET_GROUP, payload: group }
}

export function setResults(results: IResult[]): SprintAction {
  return { type: SprintActionTypes.SET_RESULTS, payload: results }
}

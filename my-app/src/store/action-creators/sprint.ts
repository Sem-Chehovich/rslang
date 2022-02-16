import { Dispatch } from 'react';
import { IResult, IWord, SprintAction, SprintActionTypes } from '../../types/sprint';
import { getCorrectUrl } from '../../utilities/utilities';


function shuffle(array: IWord[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export async function getWords(group: number, page: number) {
  const url = getCorrectUrl(`words?group=${group}&page=${page}`);
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    
    return result;
  }

  return response;
}

export const fetchWords = (group: number, page = 0) => {

  return async (dispatch: Dispatch<SprintAction>) => {
    try {
      dispatch({ type: SprintActionTypes.FETCH_WORDS });
      const wordList = await getWords(group, page);

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

export function setScore(score: number) {
  return { type: SprintActionTypes.SET_SCORE, payload: score }
}

export function setPage(page: number) {
  return { type: SprintActionTypes.SET_PAGE, payload: page }
}

export function setPagePath(pagePath: string) {
  return { type: SprintActionTypes.SET_PAGE_PATH, payload: pagePath }
}

export function clearWords(emptyArr: []) {
  return { type: SprintActionTypes.CLEAR_WORDS, payload: emptyArr }
}

export function setPagePathSecond(pagePathSecond: string) {
  return { type: SprintActionTypes.SET_PAGE_SECOND, payload: pagePathSecond }
}

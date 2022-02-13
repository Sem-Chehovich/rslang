export interface IWord {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

export interface IResult {
  questions: IWord[],
  isRight: boolean,
}

export interface SprintState {
  questions: IWord[],
  group: number,
  results: IResult[],
}

export enum SprintActionTypes {
  FETCH_WORDS = 'FETCH_WORDS',
  FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS',
  SET_GROUP = 'SET_GROUP',
  SET_RESULTS = 'SET_RESULTS',
}

interface FetchWordsAction {
  type: SprintActionTypes.FETCH_WORDS,
}

interface FetchWordsSuccessAction {
  type: SprintActionTypes.FETCH_WORDS_SUCCESS,
  payload: IWord[],
}

interface SetGroupAction {
  type: SprintActionTypes.SET_GROUP,
  payload: number,
}

interface SetResultsAction {
  type: SprintActionTypes.SET_RESULTS,
  payload: IResult[],
}

export type SprintAction = FetchWordsAction | FetchWordsSuccessAction | SetGroupAction | SetResultsAction;

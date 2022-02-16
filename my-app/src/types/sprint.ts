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
  score: number,
  page: number,
  pagePath: string,
  pagePathSecond: string,
}

export enum SprintActionTypes {
  FETCH_WORDS = 'FETCH_WORDS',
  FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS',
  SET_GROUP = 'SET_GROUP',
  SET_RESULTS = 'SET_RESULTS',
  SET_SCORE = 'SET_SCORE',
  SET_PAGE = 'SET_PAGE',
  SET_PAGE_PATH = 'SET_PAGE_PATH',
  SET_PAGE_SECOND = 'SET_PAGE_SECOND',
  CLEAR_WORDS = 'CLEAR_WORDS',
}

interface FetchWordsAction {
  type: SprintActionTypes.FETCH_WORDS,
  payload?: IWord[],
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

interface SetScoreAction {
  type: SprintActionTypes.SET_SCORE,
  payload: number,
}

interface SetPageAction {
  type: SprintActionTypes.SET_PAGE,
  payload: number,
}

interface SetPagePathAction {
  type: SprintActionTypes.SET_PAGE_PATH,
  payload: string,
}

interface ClearWordsAction {
  type: SprintActionTypes.CLEAR_WORDS,
  payload: string,
}

interface SetPagePathSecondAction {
  type: SprintActionTypes.SET_PAGE_SECOND,
  payload: string,
}

export type SprintAction = FetchWordsAction 
  | FetchWordsSuccessAction 
  | SetGroupAction 
  | SetResultsAction 
  | SetScoreAction
  | SetPageAction
  | SetPagePathAction
  | ClearWordsAction
  | SetPagePathSecondAction;

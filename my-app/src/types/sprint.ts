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
}

export enum SprintActionTypes {
  FETCH_WORDS = 'FETCH_WORDS',
  FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS',
  SET_GROUP = 'SET_GROUP',
  SET_RESULTS = 'SET_RESULTS',
  SET_SCORE = 'SET_SCORE',
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

export type SprintAction = FetchWordsAction | FetchWordsSuccessAction | SetGroupAction | SetResultsAction | SetScoreAction;

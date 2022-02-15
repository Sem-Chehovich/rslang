import { SprintAction, SprintActionTypes, SprintState,  } from '../../types/sprint';

const initialState: SprintState = {
  questions: [],
  group: 0,
  results: [],
  score: 0,
  page: 0,
  pagePath: '',
}

export const sprintReducer = (state = initialState, action: SprintAction): SprintState => {
  switch (action.type) {
    case SprintActionTypes.FETCH_WORDS:
      return {
        ...state,
      }
    case SprintActionTypes.FETCH_WORDS_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, ...action.payload],
      }
    case SprintActionTypes.SET_GROUP:
      return {
        ...state,
        group: action.payload,
      }
    case SprintActionTypes.SET_RESULTS:
      return {
        ...state,
        results: [...state.results, ...action.payload],
      }
    case SprintActionTypes.SET_SCORE:
      return {
        ...state,
        score: state.score + action.payload,
      }
    case SprintActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case SprintActionTypes.SET_PAGE_PATH:
      return {
        ...state,
        pagePath: action.payload,
      }
    case SprintActionTypes.CLEAR_WORDS:
      return {
        ...state,
        questions: [],
      }
    default: 
      return state;
  }
}
import { SprintAction, SprintActionTypes, SprintState,  } from '../../types/sprint';

const initialState: SprintState = {
  questions: [],
  group: 0,
  results: [],
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
    default: 
      return state;
  }
}
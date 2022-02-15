import { combineReducers } from 'redux';
import { sprintReducer } from './sprintReducer';


export const rootReducer = combineReducers({
  sprint: sprintReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
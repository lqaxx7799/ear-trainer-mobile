import { combineReducers } from 'redux';
import gameReducer from './game/reducers';

const allReducers = combineReducers({
  gameReducer,
});

export default allReducers;

export type RootState = ReturnType<typeof allReducers>

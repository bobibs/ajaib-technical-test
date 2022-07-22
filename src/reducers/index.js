import { combineReducers } from 'redux';
import homeReducer from '../pages/Home/reducer';

const reducers = combineReducers({
  homeReducer,
});

export default reducers;

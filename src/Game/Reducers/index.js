import { combineReducers } from 'redux';
import mainState from './mainState';
import ship from './ship';
import ufo from './ufos';
import bullet from './bullets';

export default combineReducers({
  mainState,
  ship,
  ufo,
  bullet,
});

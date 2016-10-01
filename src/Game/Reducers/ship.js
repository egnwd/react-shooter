import { combineReducers } from 'redux';
import { MOVE_SHIP, CHANGE_SHIP, SHIP_STATE_RED } from '../Actions/ship';

const MAX_SHIP_HEALTH = 100;

const health = (state = MAX_SHIP_HEALTH, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/**
 * xOffset:
 *  - negative is left
 *  - positive is right
 *  - zero is dead center
 */
const xOffset = (state = 0, action) => {
  switch (action.type) {
    case MOVE_SHIP:
      return action.position;
    default:
      return state;
  }
};

const shipState = (state = SHIP_STATE_RED, action) => {
  switch (action.type) {
    case CHANGE_SHIP:
      return action.state;
    default:
      return state;
  }
};

export default combineReducers({
  xOffset,
  shipState,
  health,
});

import { FIRE } from '../Actions/ship';
import { BULLET_DIE } from '../Actions/ship';
import { GAME_TICK } from '../Actions/tick';

const defaultBullet = {
  /**
   * Hit points, negative as it reduces the score
   */
  health: -10,
  /**
   * xOffset:
   *  - negative is left
   *  - positive is right
   *  - zero is dead center
   */
  xOffset: 0,

  /**
   * yOffset:
   *  - positive is distance from bottom
   *  - zero is the bottom
   */
  yOffset: 0,

  /**
   * Unique id for the bullet.
   * (provided by action.id)
   */
  id: null,
};
const initialState = {
  bullets: {}, // map {[id]:Bullet}
};

const bulletState = (state = initialState, action) => {
  switch (action.type) {
    case GAME_TICK:
      var newState = {bullets:{}};
      Object.keys(state.bullets).forEach((key) => {
        const bullet = state.bullets[key];
        bullet.yOffset += 3;
        if (bullet.yOffset < window.innerHeight) {
          newState.bullets[key] = bullet;
        }
      });
      return newState;
    case BULLET_DIE:
      let newState = Object.assign({}, state);
      newState.bullets = Object.assign({}, state.bullets);
      delete newState.bullets[action.id];
      return newState;
    case FIRE:
      return {
        ...state,
        bullets: {
          ...state.bullets,
          [action.id]: {
            ...defaultBullet,
            id: action.id,
            xOffset: action.xOffset
          }
        }
      };
    default:
      return state;
  }
};

export default bulletState;

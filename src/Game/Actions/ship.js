export const MOVE_SHIP = 'move ship';

export const moveShip = (position) => ({
  type: MOVE_SHIP,
  position,
});

export const SHIP_STATE_RED = 0;
export const SHIP_STATE_GREEN = 1;
export const SHIP_STATE_BLUE = 2;
export const SHIP_STATE_YELLOW = 3;

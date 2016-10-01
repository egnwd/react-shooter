export const MOVE_SHIP = 'move ship';
export const CHANGE_SHIP = 'change ship';
export const FIRE = 'fire';
export const CAN_FIRE = 'can fire';
export const BULLET_DIE = 'bullet die';

export const moveShip = (position) => ({
  type: MOVE_SHIP,
  position,
});

export const changeShip = (state) => ({
  type: CHANGE_SHIP,
  state,
})

export const canFire = (status) => ({
  type: CAN_FIRE,
  status,
});

let id = 0;
export const fire = (position) => {
  return {
    type: FIRE,
    id: `bullet${id++}`,
    xOffset: position,
  };
};

export const bullet_die = (id) => ({
  type: BULLET_DIE,
  id,
});

export const SHIP_STATE_RED = 0;
export const SHIP_STATE_GREEN = 1;
export const SHIP_STATE_BLUE = 2;
export const SHIP_STATE_YELLOW = 3;

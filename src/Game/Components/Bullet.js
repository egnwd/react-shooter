import React, { Component, PropTypes } from 'react';
import connect from '../../Lib/connect';
import AbstractSprite from './AbstractSprite';
import { bullet_die } from '../Actions/ship';

class Bullet extends Component
{
  static contextTypes = {
    loop: PropTypes.object,
  };
  static propTypes = {
    id: PropTypes.string.isRequired,
    xOffset: PropTypes.number,
    yOffset: PropTypes.number.isRequired,
    onDie: PropTypes.func.isRequired,
  };
  static defaultProps = {
    xOffset: 0,
  };

  render() {
    const { xOffset, yOffset } = this.props;
    return (
      <AbstractSprite
        src={'bullet.png'}
        tileHeight={16}
        tileWidth={16}
        offset={[0, 0]}
        state={0}
        steps={[0, 0, 0, 0]}
        style={{ bottom: yOffset, left: xOffset }}
      />
    );
  }
  static mapDispatchToProps = (dispatch, ownProps) => ({
    onDie: (id) => dispatch(bullet_die(id)),
  });
}

export default connect(Bullet);

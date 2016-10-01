import React, { Component, PropTypes } from 'react';
import connect from '../../Lib/connect';
import AbstractSprite from './AbstractSprite';
import { fire } from '../Actions/ship';
import { throttle } from 'throttle-debounce';

class Ship extends Component
{
  static contextTypes = {
    loop: PropTypes.object,
  };
  static propTypes = {
    xOffset: PropTypes.number.isRequired,
    bottom: PropTypes.number,
    onFire: PropTypes.func.isRequired,
  };
  static defaultProps = {
    bottom: 0,
  };

  constructor(props) {
    super(props);
    this.update = throttle(200, true, this.update).bind(this);
  }

  update() {
    if (this.props.canFire) {
      this.props.onFire(this.props.xOffset);
    }
  }

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  render() {
    const { bottom, xOffset, shipState } = this.props;
    return (
      <AbstractSprite
        src={'PlayerShip-Style1.png'}
        tileHeight={75}
        tileWidth={98}
        offset={[0, 0]}
        state={shipState}
        steps={[0, 0, 0, 0]}
        style={{ bottom, left: xOffset }}
      />
    );
  }
  static mapDispatchToProps = (dispatch, ownProps) => ({
    onFire: (position) => dispatch(fire(position)),
  });
  static mapStateToProps = (state) => {
    return {
      ...state.ship
    };
  };
}

export default connect(Ship);

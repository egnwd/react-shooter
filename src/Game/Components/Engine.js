// the main game engine
import React, { Component, PropTypes } from 'react';
import { Loop, World, Body } from 'react-game-kit';
import GameBackground from './GameBackground';
import Ship from './Ship';
import { tick } from '../Actions/tick';
import connect from '../../Lib/connect';

const TEXT_STYLE = {
  position: 'absolute',
  top: 10,
  left: 0,
  right: 0,
  margin: 'auto',
  color: 'white',
  textAlign: 'center',
  fontSize: '24px',
};
const SHIP_CONTAINER_STYLE = {
  position: 'absolute',
  bottom: 20,
  left: '50%',
  marginLeft: -49,
};

class Engine extends Component {
  static MAX_TICKS = 100;
  static contextTypes = {
    loop: PropTypes.object,
  };

  static propTypes = {
    onTick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      tick: 1,
    };
  }

  update() {
    const tick = (this.state.tick + 1) % Engine.MAX_TICKS;
    this.setState({
      tick,
    });
    this.props.onTick();
  };

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  render() {
    const { tick } = this.state;
    // place things like <World>, <Body>, etc here
    return (
      <World>
        <GameBackground src={'black.png'} repeat position={tick}>
          <div style={ TEXT_STYLE }>We are in the game! {tick}</div>
          <div style={ SHIP_CONTAINER_STYLE }>
            <Ship />
          </div>
        </GameBackground>
      </World>
    );
  }
  static mapDispatchToProps = (dispatch, ownProps) => ({
    onTick: (state) => dispatch(tick(state)),
  });
  static mergeProps = (state, dispatch, ownProps) => ({
    ...dispatch,
    onTick: () => dispatch.onTick(state),
    ...ownProps,
  });
}

export default connect(Engine);

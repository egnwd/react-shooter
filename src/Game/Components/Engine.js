// the main game engine
import React, { Component, PropTypes } from 'react';
import { Loop, World, Body } from 'react-game-kit';
import GameBackground from './GameBackground';
import Ship from './Ship';
import { tick } from '../Actions/tick';
import { spawnUFO } from '../Actions/ufo';
import connect from '../../Lib/connect';
import InputCapture from './InputCapture';
import UFO from './UFO';
import Bullet from './Bullet';

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
const UFO_CONTAINER_STYLE = {
  position: 'absolute',
  top: 50,
  left: '50%',
  marginLeft: -91 / 2,
};
const BULLET_CONTAINER_STYLE = {
  position: 'absolute',
  bottom: 98,
  left: '50%',
  marginLeft: -16 / 2,
};
const SHIP_CONTAINER_STYLE = {
  position: 'absolute',
  bottom: 20,
  left: '50%',
  marginLeft: -98 / 2,
};

class Engine extends Component {
  static MAX_TICKS = 100;
  static contextTypes = {
    loop: PropTypes.object,
  };

  static propTypes = {
    ufos: PropTypes.objectOf(PropTypes.shape(UFO.propTypes)).isRequired,
    bullets: PropTypes.objectOf(PropTypes.shape(Bullet.propTypes)).isRequired,
    onTick: PropTypes.func.isRequired,
    spawnEnemy: PropTypes.func.isRequired,
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

    this.props.spawnEnemy();
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  render() {
    const { tick } = this.state;
    const { ufos } = this.props;
    const { bullets } = this.props;
    // place things like <World>, <Body>, etc here
    return (
      <InputCapture>
        <World>
          <GameBackground src={'black.png'} repeat position={tick}>
            <div style={ TEXT_STYLE }>We are in the game! {tick}</div>
            <div style={ UFO_CONTAINER_STYLE }>
              {Object.keys(ufos).map((key) => {
                const ufo = ufos[key];
                return <UFO key={key} {...ufo} />;
              })}
            </div>
            {Object.keys(bullets).map((key) => {
              const bullet = bullets[key];
              return (
                <div style={ BULLET_CONTAINER_STYLE }>
                  <Bullet key={key} {...bullet} />
                </div>
              );
            })}
            <div style={ SHIP_CONTAINER_STYLE }>
              <Ship />
            </div>
          </GameBackground>
        </World>
      </InputCapture>
    );
  }
  static mapStateToProps = (state, ownProps) => {
    const { ships } = state.ufo;
    const { bullets } = state.bullet;
    return {
      ufos: ships,
      bullets: bullets,
      ...ownProps,
    };
  };
  static mapDispatchToProps = (dispatch, ownProps) => ({
    spawnEnemy: () => dispatch(spawnUFO()),
    onTick: (state) => dispatch(tick(state)),
  });
  static mergeProps = (state, dispatch, ownProps) => ({
    ...state,
    ...dispatch,
    onTick: () => dispatch.onTick(state),
    ...ownProps,
  });
}

export default connect(Engine);

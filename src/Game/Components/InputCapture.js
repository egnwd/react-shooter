import React, { Component, PropTypes } from 'react';
import connect from '../../Lib/connect';
import { moveShip, changeShip, canFire } from '../Actions/ship';
import { SHIP_STATE_RED, SHIP_STATE_GREEN, SHIP_STATE_BLUE, SHIP_STATE_YELLOW } from '../Actions/ship';

const INPUT_STYLE = {
  cursor: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
};

class InputCapture extends Component {
  static propTypes = {
    onMoveShip: PropTypes.func.isRequired,
    onChangeShip: PropTypes.func.isRequired,
    onFire: PropTypes.func.isRequired,
  };
  static RED_KEY_CODE = 97;
  static GREEN_KEY_CODE = 115;
  static BLUE_KEY_CODE = 100;
  static YELLOW_KEY_CODE = 102;
  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  onMouseMove(e) {
    // calculate the position of the mouse pointer relative to the stage
    // such that 0 is dead center horizontally
    const xPos = Math.trunc(e.pageX - window.innerWidth / 2);
    this.props.onMoveShip(xPos);
  }
  onMouseDown(e) {
    if (e.button === 0) {
      this.props.onFire(true);
    }
  }
  onMouseUp(e) {
    this.props.onFire(false);
  }
  onKeyPress(e) {
    const key = e.keyCode
    switch (key) {
      case InputCapture.RED_KEY_CODE:
        this.props.onChangeShip(SHIP_STATE_RED);
        break;
      case InputCapture.GREEN_KEY_CODE:
        this.props.onChangeShip(SHIP_STATE_GREEN);
        break;
      case InputCapture.BLUE_KEY_CODE:
        this.props.onChangeShip(SHIP_STATE_BLUE);
        break;
      case InputCapture.YELLOW_KEY_CODE:
        this.props.onChangeShip(SHIP_STATE_YELLOW);
        break;
    }
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('keypress', this.onKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('keypress', this.onKeyPress);
  }
  render() {
    return (
      <div style={ INPUT_STYLE }>
        { this.props.children }
      </div>
    )
  }
  static mapDispatchToProps = (dispatch, ownProps) => ({
    onMoveShip: (position) => dispatch(moveShip(position)),
    onChangeShip: (state) => dispatch(changeShip(state)),
    onFire: (status) => dispatch(canFire(status)),
  });
}

export default connect(InputCapture);

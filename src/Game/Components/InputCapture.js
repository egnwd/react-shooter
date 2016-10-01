import React, { Component, PropTypes } from 'react';
import connect from '../../Lib/connect';
import { moveShip, changeShip } from '../Actions/ship';
import { SHIP_STATE_RED, SHIP_STATE_GREEN, SHIP_STATE_BLUE, SHIP_STATE_YELLOW } from '../Actions/ship';

const MOUSE_STYLE = {
  cursor: 'none',
};

class InputCapture extends Component {
  static propTypes = {
    onMoveShip: PropTypes.func.isRequired,
    onChangeShip: PropTypes.func.isRequired,
  };
  static RED_KEY_CODE = 97;
  static GREEN_KEY_CODE = 115;
  static BLUE_KEY_CODE = 100;
  static YELLOW_KEY_CODE = 102;
  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  onMouseMove(e) {
    // calculate the position of the mouse pointer relative to the stage
    // such that 0 is dead center horizontally
    const xPos = Math.trunc(e.pageX - window.innerWidth / 2);
    this.props.onMoveShip(xPos);
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
    window.addEventListener('keypress', this.onKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('keypress', this.onKeyPress);
  }
  render() {
    return (
      <div style={ MOUSE_STYLE }>
        { this.props.children }
      </div>
    )
  }
  static mapDispatchToProps = (dispatch, ownProps) => ({
    onMoveShip: (position) => dispatch(moveShip(position)),
    onChangeShip: (state) => dispatch(changeShip(state)),
  });
}

export default connect(InputCapture);

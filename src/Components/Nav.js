import React from "react";

const RandomBtn = props =>
  <button className="nav_item" onClick={() => props.randomPopulate()}>
    Populate
  </button>;
const StartBtn = props =>
  <button className="nav_item" onClick={() => props.startAction()}>Start</button>;
const StopBtn = props =>
  <button className="nav_item" onClick={() => props.stopAction()}>Stop</button>;
const Turn = props =>
  <p>
    Count: {props.turn}
  </p>;
const BoardSize = props => {
    return (
    <label className="nav_item">
      Board Size
      <select
        className="nav_item"
        value={props.boardsize}
        onChange={(e) => {
          props.updateBoardSize(e.target.value)
        }}
        >
        <option value={"25x25"}>25 x 25</option>
        <option value={"50x25"}>50 x 25</option>
        <option value={"50x50"}>50 x 50</option>
        <option value={"100x50"}>100 x 50</option>
      </select>
    </label>
  )};
const SpeedToggle = props => {
    return (
    <label className="nav_item">
      Board Size
      <select
        className="nav_item"
        value={props.speed}
        onChange={(e) => {
          props.updateSpeed(e.target.value)
        }}
        >
        <option value={"10"}>Fastest</option>
        <option value={"25"}>Fast</option>
        <option value={"50"}>Medium</option>
        <option value={"200"}>Slow</option>
      </select>
    </label>
  )};

class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="nav_sub">
          <BoardSize
            boardsize={this.props.boardsize}
            updateBoardSize={this.props.updateBoardSize}
          />
          <SpeedToggle
            speed={this.props.speed}
            updateSpeed={this.props.updateSpeed}
          />
        </div>
        <div className="nav_sub">
          <RandomBtn randomPopulate={this.props.randomPopulate} />
          <div className="nav_sub">
            <StartBtn startAction={this.props.startAction} />
            <StopBtn stopAction={this.props.stopAction} />
          </div>
          <Turn turn={this.props.turn} />
        </div>
      </div>
    );
  }
}

export default Nav;

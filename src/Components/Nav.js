import React from "react";

const RandomBtn = props =>
  <button className="" onClick={() => props.randomPopulate()}>
    Populate
  </button>;
const StartBtn = props =>
  <button className="nav_item" onClick={() => props.startAction()}>
    Start
  </button>;
const StopBtn = props =>
  <button className="nav_item" onClick={() => props.stopAction()}>
    Stop
  </button>;
const ClearBtn = props =>
  <button className="nav_item" onClick={() => props.clearAction()}>
    Clear
  </button>;
const Turn = props =>
  <p className="nav_turn">
    Turns: {props.turn}
  </p>;
const BoardSize = props => {
  return (
    <label className="">
      Board Size
      <select
        className="nav_item"
        value={props.boardsize}
        onChange={e => {
          props.updateBoardSize(e.target.value);
        }}
      >
        <option value={"25x25"}>25 x 25</option>
        <option value={"50x25"}>50 x 25</option>
        <option value={"50x50"}>50 x 50</option>
        <option value={"100x50"}>100 x 50</option>
      </select>
    </label>
  );
};

const SpeedToggle = props => {
  return (
    <label className="nav_item">
      Speed
      <select
        className="nav_item"
        value={props.speed}
        onChange={e => {
          props.updateSpeed(e.target.value);
        }}
      >
        <option value={"20"}>Fastest</option>
        <option value={"50"}>Fast</option>
        <option value={"100"}>Medium</option>
        <option value={"200"}>Slow</option>
      </select>
    </label>
  );
};

class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="nav_sub">
          <RandomBtn randomPopulate={this.props.randomPopulate} />
          <StartBtn startAction={this.props.startAction} />
          <StopBtn stopAction={this.props.stopAction} />
          <ClearBtn clearAction={this.props.clearAction} />
          <Turn turn={this.props.turn} />
        </div>
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
      </div>
    );
  }
}

export default Nav;

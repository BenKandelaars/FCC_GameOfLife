import React from "react";
import Nav from "./Nav.js";
import Grid from "./Grid.js";
import { convertIndex2Coord } from "./HelperComponents.js";

function initializeGameBoard(x, y) {
  let grid_row = new Array(x);
  grid_row.fill(false);
  let grid = new Array(y);
  grid.fill(grid_row);

  let gameBoard = new Array(x * y);
  gameBoard.fill(false);
  return gameBoard;
}

function calcNextGameBoard(currentGameBoard, height, width) {
  function calcLiveNeighbours(index) {
    const vectorsToCheck = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1]
    ];

    let liveNeighbours = 0;
    let tileIndex;
    const tileVector = convertIndex2Coord(index, width);

    for (let vector of vectorsToCheck) {
      vector[0] = tileVector.x + vector[0];
      vector[1] = tileVector.y + vector[1];

      if (vector[0] < 0 || vector[0] > width) {
        break;
      }

      if (vector[1] < 0 || vector[1] > height) {
        break;
      }

      tileIndex = vector[1] * width + vector[0];
      liveNeighbours += currentGameBoard[tileIndex] ? 1 : 0;
    }

    return liveNeighbours;
  }

  const newGameBoard = currentGameBoard.map((tile, index) => {
    const numLiveNeighbours = calcLiveNeighbours(index);

    if (!tile && numLiveNeighbours === 3) {
      return true;
    }

    if (tile && numLiveNeighbours >= 2 && numLiveNeighbours <= 3) {
      return true;
    }

    return false;
  });
  return newGameBoard;
}

class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 50,
      width: 50,
      turn: 0,
      speed: 100
    };

    this.timer = undefined;
    this.updateViewNextTurn = this.updateViewNextTurn.bind(this);
  }

  componentWillMount() {
    this.setState({
      gameBoard: initializeGameBoard(
        this.state.height,
        this.state.width)
    });
  }

  componentDidMount() {
    this.randomPopulate();
    this.startAction();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.speed !== this.state.speed && this.timer) {
      this.stopAction();
      this.startAction();
    }
  }

  changeTile(vector) {
    if (vector === null || this.timer ) {
      return;
    }
    let gameBoard = this.state.gameBoard;
    const coord = vector.x + this.state.width * vector.y;
    gameBoard[coord] = !gameBoard[coord];

    this.setState({
      gameBoard: gameBoard
    });
  }

  startAction() {
    this.timer = setInterval(() => {
      const newGameBoard = calcNextGameBoard(
        this.state.gameBoard,
        this.state.height,
        this.state.width
      );
      this.updateViewNextTurn(newGameBoard);
    }, this.state.speed);
  }

  updateViewNextTurn(newGameBoard) {
    const nextTurn = this.state.turn + 1;
    this.setState({
      turn: nextTurn,
      gameBoard: newGameBoard
    });
  }

  stopAction() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  clearAction() {
    this.stopAction()
    this.setState({
      gameBoard: initializeGameBoard(
        this.state.height,
        this.state.width),
      turn: 0
    });
  }

  updateBoardSize(value) {
    const BoardSizeArr = value.split("x");

    this.setState({
      width: BoardSizeArr[0],
      height: BoardSizeArr[1],
      gameBoard: initializeGameBoard(BoardSizeArr[0], BoardSizeArr[1])
    });
  }

  updateSpeed(value) {
    this.setState({
      speed: value
    });
  }

  randomPopulate() {
    let currentGameBoard = this.state.gameBoard;

    // Random seed between 0.4 & 0.75
    // Take random number, times by range and add lowest number
    const chanceToLive = Math.random() * 0.35 + 0.4;
    const nextGameBoard = currentGameBoard.map(tile => {
      const outcome = Math.random() * chanceToLive;
      return outcome > 0.4 ? true : false;
    });

    this.setState({
      gameBoard: nextGameBoard,
      turn: 0
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Nav
          boardsize={`${this.state.width}x${this.state.height}`}
          updateBoardSize={this.updateBoardSize.bind(this)}
          speed={this.state.speed}
          updateSpeed={this.updateSpeed.bind(this)}
          randomPopulate={this.randomPopulate.bind(this)}
          startAction={this.startAction.bind(this)}
          stopAction={this.stopAction.bind(this)}
          clearAction={this.clearAction.bind(this)}
          turn={this.state.turn}
        />
        <Grid
          gameBoard={this.state.gameBoard}
          width={this.state.width}
          height={this.state.height}
          changeTile={this.changeTile.bind(this)}
        />
      </div>
    );
  }
}

export default Wrapper;
//  <ExtraControls />

import React from "react";
import { convertIndex2Coord } from "./HelperComponents.js";

class GameBoard extends React.Component {
  handleClick(e, width) {
    const dataID = e.target.getAttribute("data-id");
    const vector = convertIndex2Coord(dataID, width);

    this.props.changeTile(vector);
  }

  render() {
    let width, height;
    ({ width, height } = this.props);
    let board = [];
    let mRow, jsxRow;

    for (let y = 0; y < height; y++) {
      mRow = this.props.gameBoard.slice(width * y, width * (y + 1));
      jsxRow = (
        <tr key={y}>
          {mRow.map((tile, index) =>
            <td
              key={width * y + index}
              className={tile ? "solid" : "blank"}
              data-id={width * y + index}
            />
          )}
        </tr>
      );
      board.push(jsxRow);
    }

    return (
      <div className="gameboard">
        <table onClick={e => this.handleClick(e, width)}>
          <tbody>
            {board}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GameBoard;

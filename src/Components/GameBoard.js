import React from 'react';

function convertBoardID2Coord(dataID, maxX){
  let vector = {
    x: dataID % maxX,
    y: (Math.floor(dataID / maxX))+1
  }

  return dataID === null ? null : vector
}

class GameBoard extends React.Component {
  constructor (props) {
    super(props)
  }

  handleClick(e, maxX){
    const dataID = e.target.getAttribute('data-id')
    const vector = convertBoardID2Coord(dataID, maxX)

    console.log(vector)

    this.props.changeTile(vector)
  }

  render(){

  let maxX, maxY
  ({maxX, maxY} = this.props)
  let board = []
  let mRow, jsxRow

  for (let y = 0; y < maxY; y++){
    mRow = this.props.gameBoard.slice(maxX*y, maxX*(y+1))
    jsxRow = (
      <tr key={y}>
        {mRow.map((tile, index) => (
              <td
                key={maxX*y + index}
                className={tile ? "solid" : "blank"}
                data-id={maxX*y+index}>
              </td>
            )
          )}
      </tr>)
    board.push(jsxRow)
  }

    return (
      <div className="gameboard">
        <table onClick={(e) => this.handleClick(e, maxX)}>
          <tbody>
            {board}
          </tbody>
        </table>
      </div>
    )
  }
}

export default GameBoard

import React from 'react';
import Nav from './Nav.js'
import GameBoard from './GameBoard.js'

function initializeGameBoard (x, y){
  let gameBoard = new Array(x*y)
  gameBoard.fill(false)
  return gameBoard
}


class GolWrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      maxX: 25,
      maxY: 25,
      gameBoard: initializeGameBoard(25, 25)
    }
  }

  changeTile(vector){

    if (vector === null) { return }

    let gameBoard = this.state.gameBoard
    let x = vector.x
    let y = vector.y

    const coord = this.state.maxX*(y-1)+x

    console.log(vector)

    gameBoard[coord] = !gameBoard[coord]

    this.setState({
      gameBoard: gameBoard
    })

  }

  render(){
    return (
      <div className='wrapper'>
        <Nav />
        <GameBoard
          gameBoard={this.state.gameBoard}
          maxX={this.state.maxX}
          maxY={this.state.maxY}

          changeTile = {this.changeTile.bind(this)} />
      </div>
    )
  }
}

export default GolWrapper
//  <ExtraControls />

import { useState } from "react";

import GameBoard from "./components/Gameboard.tsx";
import Player from "./components/Player.tsx";
import Log from "./components/Log.tsx";

// {/* even though we have component Player for both, these are 2 separate instances, so Player 1 instance will be DIFFERENt than Player 2 instance */}

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // use this useState array instead of the func inside of GameBoard.tsx to keep track of current state / change of state


  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer( (curActivePlayer) => curActivePlayer === 'X' ? 'O': 'X');
    setGameTurns(prevTurns => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') { // prevTurns[0] will always be previous turn
        currentPlayer = 'O';
      }
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];

      return updatedTurns;

    });
  }

  return (
    <main>
      <h1>Tic Tac Toe</h1>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player1" symbol="X" isActive={activePlayer ==="X"} />
          <Player initialName="Player2" symbol="O"isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
      </div>
      <Log/>
    </main>
  );
}

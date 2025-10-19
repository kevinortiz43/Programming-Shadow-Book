import { useState } from "react";

import GameBoard from "./components/Gameboard.tsx";
import Player from "./components/Player.tsx";

// {/* even though we have component Player for both, these are 2 separate instances, so Player 1 instance will be DIFFERENt than Player 2 instance */}

export default function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    setActivePlayer( (curActivePlayer) => curActivePlayer === 'X' ? 'O': 'X')
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
      LOG
    </main>
  );
}

import { useState } from "react";

type CellValue = "X" | "O" | null;
type GameBoard = CellValue[][];

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare,activePlayerSymbol }:{onSelectSquare:any, activePlayerSymbol:any}) {
  const [gameBoard, setGameBoard] = useState<GameBoard>(initialGameBoard);

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameBoard((prevGameBoard) => {
      const updateBoard: GameBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updateBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updateBoard;
    });

    onSelectSquare(); // invoked only if square was selected by user
    // we call onSelectSquare() so we call func defined OUTSIDE GameBoard component from inside GameBoard component (see App.jsx file code) cuz value of GameBoard component should be a function (CLOSURE), and we're executing the func here
// func that will be executed is defined in the App.jsx file (handleSelectSquare) -> see GameBoard on SelectSquare={handleSelectSquare}   
}

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          {/* having {rowIndex} inside function like this not always optimal, but in this use case okay */}
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

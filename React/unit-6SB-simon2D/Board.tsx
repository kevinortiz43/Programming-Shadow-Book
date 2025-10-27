import React, { useState, useEffect, createContext } from 'react';
import Box from './Box';
import colors from './colors';
import { BoxContextType } from './BoxContextType';

// Create the context
export const BoxContext = createContext<BoxContextType>({
  handleBoxClick: () => {},
  handleNewColors: () => {},
});

export default function Board() {
  // Initialize 2D array state
  const [board, setBoard] = useState<string[][]>(() => 
    Array(4).fill(null).map(() => Array(4).fill(null))
  );

  // Generate random colors for the entire board
  const generateRandomBoard = () => {
    return Array(4).fill(null).map(() => 
      Array(4).fill(null).map(() => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      })
    );
  };

  // Initialize board on component mount
  useEffect(() => {
    setBoard(generateRandomBoard());
  }, []);

  // Handle "New Colors!" button click
  const handleNewColors = () => {
    setBoard(generateRandomBoard());
  };

  // Handle individual box clicks
  const handleBoxClick = (row: number, col: number) => {
    const newRandomIndex = Math.floor(Math.random() * colors.length);
    const newColor = colors[newRandomIndex];
    
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]);
      newBoard[row][col] = newColor;
      return newBoard;
    });
  };

  // Create context value object
  const contextValue: BoxContextType = {
    handleBoxClick,
    // handleNewColors
  };

  return (
    // Wrap everything in the context provider
    <BoxContext.Provider value={contextValue}>
      <div id="board">
        <button className="btn" onClick={handleNewColors}>
          New Colors!
        </button>
        
        {/* Create 4x4 grid */}
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((color, colIndex) => (
              <Box 
                key={`${rowIndex}-${colIndex}`} 
                color={color}
                row={rowIndex}
                col={colIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </BoxContext.Provider>
  );
}
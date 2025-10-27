
import React, { useContext } from 'react';
import { BoxContext } from './Board';

interface BoxProps {
  color: string;
  row: number;
  col: number;
}

const Box = ({ color, row, col }: BoxProps) => {
  // Use context to get the click handler
  const { handleBoxClick } = useContext(BoxContext);

  return (
    <div 
      className="box" 
      style={{ backgroundColor: color }}
      onClick={() => handleBoxClick(row, col)} // Use context function
    />
  );
};

export default Box;
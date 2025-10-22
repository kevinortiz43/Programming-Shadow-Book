// Clicking on the upper left square runs the function that the button received as its onClick prop from the Square.
//  The Square component received that function as its onSquareClick prop from the Board.
// The Board component defined that function directly in the JSX. It calls handleClick with an argument of 0.
// handleClick uses the argument (0) to update the first element of the squares array from null to X.
// The squares state of the Board component was updated, so the Board and all of its children re-render.
// This causes the value prop of the Square component with index 0 to change from null to X.

/**
 * 
 * 
 * Why immutability is important 
Note how in handleClick, you call .slice() to create a copy of the squares array instead of modifying the existing array. To explain why, we need to discuss immutability and why immutability is important to learn.

There ara. e generally two approaches to changing dat
The first approach is to mutate the data by directly changing the data’s values. 
The second approach is to replace the data with a new copy which has the desired changes.
 Here is what it would look like if you mutated the squares array:

const squares = [null, null, null, null, null, null, null, null, null];
squares[0] = 'X';
// Now `squares` is ["X", null, null, null, null, null, null, null, null];
And here is what it would look like if you changed data without mutating the squares array:

const squares = [null, null, null, null, null, null, null, null, null];
const nextSquares = ['X', null, null, null, null, null, null, null, null];
// Now `squares` is unchanged, but `nextSquares` first element is 'X' rather than `null`
The result is the same but by not mutating (changing the underlying data) directly, you gain several benefits.

Immutability makes complex features much easier to implement.
 Later in this tutorial, you will implement a “time travel” feature that lets you review the game’s history and “jump back” to past moves.
 This functionality isn’t specific to games—an ability to undo and redo certain actions is a common requirement for apps. Avoiding direct data mutation lets you keep previous versions of the data intact, and reuse them later.

There is also another benefit of immutability. By default, all child components re-render automatically when the state of a parent component changes. This includes even the child components that weren’t affected by the change. Although re-rendering is not by itself noticeable to the user (you shouldn’t actively try to avoid it!), you might want to skip re-rendering a part of the tree that clearly wasn’t affected by it for performance reasons. Immutability makes it very cheap for components to compare whether their data has changed or not. You can learn more about how React chooses when to re-render a component in the memo API reference.
 */

import { useState } from "react";
import Square from "./Square";

// board component
// we are lifting up the square component up into the board componenet

export default function Board() {
  // creating a empty array with 9 places and filled with null
  const [squares, setSquares] = useState(Array(9).fill(null));
  /*
  square = 
  [null,null,null,null,null,null],null,null,null]
  */


  // turns setting the initial state to true
  const [turns, setTurns] = useState(true);

  // setting the winner variable to the evaluated result of calculated winner (squares)
  const winner = calculateWinner(squares);

  // creating an empty status to null
  let status;

  // if winner is true then we return winner
  if (winner) {
    status = "Winner " + winner;

    // if winner is not true then it is the next players turn
  } else {
    status = "Current Player " + (turns ? "X" : "O");
  }

  //handle click function for the button
  function handleClick(i: number) {
    // if the current box is filled already then early return
    // if we have a winner then early return
    if (squares[i] !== null || calculateWinner(squares)) {
      return;
    }
    //make a copy of the squares (board) that is the board i want to use
    // for mutability
    const nextSquares = squares.slice();
    // if true then x goes
    if (turns) {
      nextSquares[i] = "X";
      // nextSquares[0] ="X"

      // if false then o goes
    } else {
      nextSquares[i] = "O";
    }

    // we set the board to the new board
    //  square =
    // [null,null,null,null,null,null],null,null,null]

    // then
    //  square =
    // [X,null,null,null,null,null],null,null,null]

    // then
    //  square =
    // [X,null,null,
    // null,null,null],
    // null,null,O]

    setSquares(nextSquares);
    // setTurns = false so the next player goes
    setTurns(!turns);
  }

  function calculateWinner(squares: number[]) {
    const lines = [
      // horizontal winning conditions
      // x x x
      // o o o
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical  winning conditions
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // vertical winning condition

      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        console.log(`a`, a);

        console.log(`b`, b);

        console.log(`c`, c);
        console.log(squares[a]);
        return squares[a];
      }
    }
    return null;
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        ></Square>
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        ></Square>
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        ></Square>
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        ></Square>
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        ></Square>
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        ></Square>
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        ></Square>
      </div>
    </>
  );
}

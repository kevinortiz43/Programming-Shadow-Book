// https://youtu.be/nC1rbW2YSz0?si=Vi-cENUHPHi2iq2m&t=1274

// Question 1: find all possible positions of 4 queens (chess) so no queen threatens another
function nQueens(board: boolean[][], row: number = 0): number {
  if (row === board.length) {
    // base case when we reach end of row
    display(board);
    console.log("\n");
    return 1; // return 1, only occurs after all 4 queens placed
  }
  // place the queen and checking for every row and column
  let count = 0;

  for (let col: number = 0; col < board.length; col++) {
    // to move pointer 1 cell right (by 1 col)

    if (isSafe(board, row, col)) {
      // run only if isSafe is true
      board[row][col] = true; // if safe, place queen, and change cell to true
      count += nQueens(board, row + 1); // skip rest of row
      // move pointer (1 row down) // many recursive calls will pause at line 17 until recursion finishes
      board[row][col] = false; // backtracking only occurs after a recursive call is popped off. That popped off recusive call had determined there's no safe placement for next queen by row end. Backtrack -> prev recursive call (paused at prev queen's prev row pos), revert that prev queen's cell back to false
    }
  }
  return count; // returns 0 (right b4 most recursive calls are popped off) until we actually hit a base case (where we've found a solution with all 4 queens placed). Base case returns 1 (count += 1 at Line 17)
}

function isSafe(board: boolean[][], row: number, col: number): boolean {
  // boolean check
  // check vertical rows above
  for (let i: number = 0; i < row; i++) {
    if (board[i][col]) {
      return false;
    }
  }
  // check diag left above
  let maxLeft: number = Math.min(row, col);
  for (let i: number = 1; i <= maxLeft; i++) {
    if (board[row - i][col - i]) {
      return false;
    }
  }
  // check diag right above
  let maxRight: number = Math.min(row, board.length - col - 1);
  for (let i: number = 1; i <= maxRight; i++) {
    if (board[row - i][col + i]) {
      return false;
    }
  }
  return true;
}

// display function
function display(board: boolean[][]) {
  for (let row of board) {
    let rowString = "";
    for (let element of row) {
      if (element) {
        rowString += "Q ";
      } else {
        rowString += "X";
      }
    }
    console.log(rowString); // Fixed: log the entire row at once
  }
}

let n = 4;
// let board: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));
let board: boolean[][] = Array(n)
  .fill(0)
  .map(() => Array(n).fill(false));

// nQueens(board);


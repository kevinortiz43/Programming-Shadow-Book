// https://youtu.be/nC1rbW2YSz0?si=mHa7WX1wz7qJwpcZ&t=4029

// sudoku solver

function solve(board: number[][]): boolean {
  let n = board.length;
  let row = -1; // starting at -1 so can start row i iterable at 0??
  let col = -1; // starting at -1 so can start col j iterable at 0??

  // this is how we're replacing row, col that we previously put into input parameter

  // finding first empty cell
  let emptyLeft: boolean = true; // we haven't yet traversed the row
  for (let i = 0; i < n; i++) {
    // traversing 1 row down (similar to row+1, except labeling iterable variable i)
    for (let j = 0; j < n; j++) {
      // traversing 1 cell right (similar to col+1, except using iterable variable j)
      if (board[i][j] === 0) {
        row = i; // if empty cell, reassign row to i to target that cell
        col = j; // if empty cell, reassign col to j
        emptyLeft = false; // means that we've traversed entire row and no more empty cells left
        break; // break out of the current row and go to next row (row or i + 1)
      }
    }
    // if found some empty element in row, then break
    if (emptyLeft === false) {
      break; // break out of outer i loop
    }
  }
  if (emptyLeft === true) {
    // by now, traversed both outer / inner loops
    return true; // sudoko has been solved since no more empty cells in entire board
  }

  // try numbers 1-9, isSafe check and backtracking
  for (let number: number = 1; number <= 9; number++) {
    if (isSafe(board, row, col, number)) {
      board[row][col] = number; // check if safe, if so then place number in empty boxes
      if (solve(board)) {
        // found the answer
        return true;
      } else {
        // backtrack by reverting boxes to 0
        board[row][col] = 0;
      }
    }
  }
  return false;
}

function isSafe(
  board: number[][],
  row: number = 0,
  col: number = 0,
  num: number = 0
): boolean {
  // check row for duplicates, EXCEPT current cell
  for (let i = 0; i < board.length; i++) {
    // check if the number is in the row
    if (i !== col && board[row][i] === num) {
      // we're referring to input row / col in parameter
      return false;
    }
  }

  // check col for duplicates, EXCEPT current cell
  for (let j = 0; j < board.length; j++) {
    // check if number is in the col
    if (j !== row && board[j][col] === num) {
      return false;
    }
  }

  // check 3 x 3 boxes for duplicates
  let sqrt = Math.sqrt(board.length); // for 9 x 9 board, this is 3
  let rowStart = row - (row % sqrt); // find start of box (upper left corner cell)
  let colStart = col - (col % sqrt); // find end of box (lower right corner cell)

  for (let r = rowStart; r < rowStart + sqrt; r++) {
    for (let c = colStart; c < colStart + sqrt; c++) {
      // don't check cell we're trying to fill
      if (r !== row && c !== col && board[r][c] === num) {
        // use r and c (not parameter input row, col) because we're iterating over r and c
        return false;
      }
    }
  }
  return true;
}

function display(board: number[][]) {
  for (let row of board) {
    // outer loop is moving 1 row down (row + 1)
    let rowString = "";
    for (let num of row) {
      // inner loop is moving 1 cell right (col + 1)
      rowString += num + " ";
    }
    console.log(rowString);
  }
  console.log("\n");
}

const board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];
// display will print:
// 5 3 4 6 7 8 9 1 2
// 6 7 2 1 9 5 3 4 8
// 1 9 8 3 4 2 5 6 7
// 8 5 9 7 6 1 4 2 3
// 4 2 6 8 5 3 7 9 1
// 7 1 3 9 2 4 8 5 6
// 9 6 1 5 3 7 2 8 4
// 2 8 7 4 1 9 6 3 5
// 3 4 5 2 8 6 1 7 9

if (solve(board)) {
  display(board);
} else {
  console.log("cannot solve");
}

// leet code solution
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  solve(board);
};

function solve(board) {
  let n = board.length;
  let row = -1;
  let col = -1;

  let emptyLeft = true;

  // Find the next empty cell
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === ".") {
        row = i;
        col = j;
        emptyLeft = false;
        break;
      }
    }
    if (!emptyLeft) {
      break;
    }
  }

  // If no empty cells left, puzzle is solved
  if (emptyLeft) {
    return true;
  }

  // Try numbers 1-9
  for (let number = 1; number <= 9; number++) {
    if (isSafe(board, row, col, number.toString())) {
      board[row][col] = number.toString();
      if (solve(board)) {
        return true;
      } else {
        // Backtrack
        board[row][col] = ".";
      }
    }
  }
  return false;
}

function isSafe(board, row, col, num) {
  // Check row
  for (let j = 0; j < board.length; j++) {
    if (board[row][j] === num) {
      return false;
    }
  }

  // Check column
  for (let i = 0; i < board.length; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  let sqrt = Math.sqrt(board.length);
  let rowStart = row - (row % sqrt);
  let colStart = col - (col % sqrt);

  for (let r = rowStart; r < rowStart + sqrt; r++) {
    for (let c = colStart; c < colStart + sqrt; c++) {
      if (board[r][c] === num) {
        return false;
      }
    }
  }

  return true;
}


function nKnights(
  board1: boolean[][],
  target: number = 0,
  row: number = 0,
  col: number = 0
): number | undefined {

  if (target === 0) {
    // base case when we reach end of row
    displayKnights(board1);
    console.log("\n");
    return;
  }

  if (row === board1.length - 1 && col === board1.length) { // reaches the end of the board
    return;
  }

  if (col === board1.length) { // reaches end of row
    nKnights(board1, target, row + 1, 0); // move to next row
    return;
  }

  if (isSafeKnights(board1, row, col)) {  // run only if isSafeKnights is true
    board1[row][col] = true; // if safe, place knight, and change cell to true
    nKnights(board1, target-1, row, col+1); // move right 1 cell
    board1[row][col] = false; // backtrack only after recursive call is popped off. That popped off recusive call had determined there's no safe placement for next knight. Backtrack -> prev recursive call (paused at prev knight's prev row pos), revert that prev knight's cell back to false
  }

  nKnights(board1, target, row, col + 1); // if not safe, skip current pointer pos and move right 1 cell
}

// make sure pointer stays inside board1
// created isValid() so we can use isValid inside isSafeKnights()
function isValid(board1: boolean[][], row: number, col: number): boolean {
  if (row >= 0 && row < board1.length && col >= 0 && col < board1.length) {
    return true;
  }
  return false;
}

function isSafeKnights(board1: boolean[][], row: number, col: number): boolean {
  // boolean check
  // check vertical rows above

  if (isValid(board1, row - 2, col - 1)) {
    if (board1[row - 2][col - 1]) {
      return false;
    }
  }

  if (isValid(board1, row - 1, col - 2)) {
    if (board1[row - 1][col - 2]) {
      return false;
    }
  }

  if (isValid(board1, row - 2, col + 1)) {
    if (board1[row - 2][col + 1]) {
      return false;
    }
  }

  if (isValid(board1, row - 1, col + 2)) {
    if (board1[row - 1][col + 2]) {
      return false;
    }
  }
  return true;
}

// displayKnights function
function displayKnights(board1: boolean[][]) {
  for (let row of board1) {
    let rowString = "";
    for (let element of row) {
      if (element) {
        rowString += "O";
      } else {
        rowString += "X";
      }
    }
    console.log(rowString); // Fixed: log the entire row at once
  }
}

let n1 = 4;
// let board1
// : boolean[][] = Array.from({ length: n1 }, () => Array(n1).fill(false));
let board1: boolean[][] = Array(n1)
  .fill(null)
  .map(() => Array(n1).fill(false));

nKnights(board1, 4); 

// NOTE: this solution will have duplicates since it shows all permutations (not only unique combinations)  
// No ordering constraint: Your algorithm can place knights in any order, leading to permutations of the same solution.
// Backtracking explores all permutations: When you place knight A then knight B, and also knight B then knight A, you get duplicate solutions.





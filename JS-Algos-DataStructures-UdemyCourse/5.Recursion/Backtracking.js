// https://youtu.be/zg5v2rlV1tM?si=L10TQJuFsV1SWGcu

// Question 1: how many paths to get to finish point, if can move only down or right?

function mazeCount(row, col) {
  if (row === 1 || col === 1) return 1; // base case: return only 1 path

  let left = mazeCount(row - 1, col);
  let right = mazeCount(row, col - 1);

  return left + right;
}

console.log(mazeCount(3, 3)); // 6

// Question 2a: print all possible paths can reach finish point, if can move only down or right? (Hint: permutations question) // PRINT only, not put in array yet

function mazePaths(row, col, proc = "") {
  if (row === 1 && col === 1) {
    console.log(proc);
    return;
  }

  if (row > 1) mazePaths(row - 1, col, proc + "D");
  if (col > 1) mazePaths(row, col - 1, proc + "R");
}

mazePaths(3, 3);

// Question 2b: return in array - all possible paths can reach finish point, if can move only down or right?
// array in BODY

function mazePathArr(row, col, proc = "") {
  const newArr = [];

  // base case: reached bottom-right corner
  if (row === 1 && col === 1) {
    return [proc];
  }

  // move down
  if (row > 1) {
    const downPaths = mazePathArr(row - 1, col, proc + "D");
    newArr.push(...downPaths); // use ... to get flat arr of strings, not [ [str1, str2], [str3] etc. ]
    // newArr.push(downPaths) // this will cause nested arrays
  }

  // move right
  if (col > 1) {
    const rightPaths = mazePathArr(row, col - 1, proc + "R");
    newArr.push(...rightPaths);
    // newArr.push(rightPaths)
  }
  return newArr;
  // return [...downPaths, ...rightPaths];
}
console.log("arr in body maze");
console.log(mazePathArr(3, 3));

// Question 2c: return in array - all possible paths can reach finish point, if can move only down or right?
// array in PARAMETER
// seems like array has to be in the BODY for it to output unique solutions INSIDE of function

function mazePathArr1(row, col, proc = "", results) {
  // ensure a fresh array when caller didn't provide one
  results = results ?? [];

  // base case
  if (row === 1 && col === 1) {
    results.push(proc);
    return results;
  }

  // explore moves
  if (row > 1) mazePathArr1(row - 1, col, proc + "D", results);
  if (col > 1) mazePathArr1(row, col - 1, proc + "R", results);

  return results;
}

// ✅ Deduplicate once at the top-level call
const paths = mazePathArr1(3, 3);
const unique = Array.from(new Set(paths));

console.log("Unique paths:");
console.log(unique);

// Question 3: return in arr - all possible paths can reach finishD point, if can move only down, right, AND diagonally
// array in BODY

function mazePathArrDiag(row, col, proc = "") {
  const newArr = [];

  // base case: reached bottom-right corner
  if (row === 1 && col === 1) {
    return [proc];
  }

  // move diagonally
  if (row > 1 && col > 1) {
    newArr.push(...mazePathArrDiag(row - 1, col - 1, proc + "D")); // just have to make sure r-1 and c-1
  }

  // move vertical
  if (row > 1) {
    newArr.push(...mazePathArrDiag(row - 1, col, proc + "V"));
  }

  // move horizontal
  if (col > 1) {
    newArr.push(...mazePathArrDiag(row, col - 1, proc + "H"));
  }
  return newArr;
}

console.log("added diagonal path option");
console.log(mazePathArrDiag(3, 3));

// Question 4: maze with OBSTACLES. Return in arr - all possible paths can reach finishD point, if can move only down, right, AND diagonally
// array in BODY


function mazeObstacles1(row, col, maze, proc = "") {
  const newArr = [];

  // base case: reached bottom-right corner
  if (row === maze.length - 1 && col === maze[0].length - 1) {
    return [proc];
  }

  if (!maze[row][col]) {
    // if not false (i.e. true) then stop recursion
    return []; // need to tell JS return an array (unlike with TS or Java where can determine type ahead of time)
  }

  // move vertical
  if (row < maze.length - 1) {
    newArr.push(...mazeObstacles1(row + 1, col, maze, proc + "D"));
  }

  // move horizontal
  if (col < maze[0].length - 1) {
    newArr.push(...mazeObstacles1(row, col + 1, maze, proc + "R"));
  }
  return newArr;
}

const board = [
  [true, true, true],
  [true, false, true],
  [true, true, true],
];

console.log(mazeObstacles1(0, 0, board)); // Start at (0, 0) instead of (3, 3)

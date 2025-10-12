// Question 4: maze with obstacles

function mazeObstacles3(
  row: number,
  col: number,
  maze: boolean[][],
  proc: string = ""
): string[] {
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
    newArr.push(...mazeObstacles3(row + 1, col, maze, proc + "D"));
  }

  // move horizontal
  if (col < maze[0].length - 1) {
    newArr.push(...mazeObstacles3(row, col + 1, maze, proc + "R"));
  }
  return newArr;
}

// obstacle is at [2, 2] where false
const board1: boolean[][] = [
  [true, true, true],
  [true, false, true],
  [true, true, true],
];

console.log(mazeObstacles3(0, 0, board1)); // Start at (0, 0) instead of (3, 3)

// Question 5: find all paths possible if can go up, down, left, right // involves BACKTRACKING
function allPaths(
  row: number,
  col: number,
  maze: boolean[][],
  proc: string = ""
): string[] {
  const newArr = [];

  // base case: reached bottom-right corner
  if (row === maze.length - 1 && col === maze[0].length - 1) {
    return [proc];
  }

  if (!maze[row][col]) {
    // if not false (i.e. true) then stop recursion
    return []; // need to tell JS return an array (unlike with TS or Java where can determine type ahead of time)
  }
  // consider the block in my path
  maze[row][col] = false;

  // move up
  if (row > 0) {
    newArr.push(...allPaths(row - 1, col, maze, proc + "U"));
  }

  // move down
  if (row < maze.length - 1) {
    newArr.push(...allPaths(row + 1, col, maze, proc + "D"));
  }

  // move right
  if (col < maze[0].length - 1) {
    newArr.push(...allPaths(row, col + 1, maze, proc + "R"));
  }

  // move left
  if (col > 0) {
    newArr.push(...allPaths(row, col - 1, maze, proc + "L"));
  }

  // this line is where function will be over (backtracking here)
  // so before the function gets removed, also remove the changes made by that function (change false BACK to true)
  // how you can revert history back to original state to then derive new paths
  maze[row][col] = true;

  return newArr;
}

const board2: boolean[][] = [
  [true, true, true],
  [true, true, true],
  [true, true, true],
];

console.log(allPaths(0, 0, board2)); // Start at (0, 0) instead of (3, 3)

// Question 6: print all paths (using step numbers)

// Question 5: find all paths possible if can go up, down, left, right // involves BACKTRACKING
function allPathsPrint(
  row: number,
  col: number,
  maze: boolean[][],
  path: number[][],
  step: number,
  proc: string = ""
): string[] {
  const newArr = [];

  // base case: reached bottom-right corner
  if (row === maze.length - 1 && col === maze[0].length - 1) {
    path[row][col] = step; // Don't forget to mark the final position
    for (let arr of path) {
      console.log(arr);
    }
    console.log(proc);
    console.log(`\n`);
    return [proc];
  }



  if (!maze[row][col]) {
    // if not false (i.e. true) then stop recursion
    return []; // need to tell JS return an array (unlike with TS or Java where can determine type ahead of time)
  }
  // consider the block in my path
  maze[row][col] = false;
  path[row][col] = step;

  // move up
  if (row > 0) {
    newArr.push(
      ...allPathsPrint(row - 1, col, maze, path, step + 1, proc + "U")
    );
  }

  // move down
  if (row < maze.length - 1) {
    newArr.push(
      ...allPathsPrint(row + 1, col, maze, path, step + 1, proc + "D")
    );
  }

  // move right
  if (col < maze[0].length - 1) {
    newArr.push(
      ...allPathsPrint(row, col + 1, maze, path, step + 1, proc + "R")
    );
  }

  // move left
  if (col > 0) {
    newArr.push(
      ...allPathsPrint(row, col - 1, maze, path, step + 1, proc + "L")
    );
  }

  // this line is where function will be over (backtracking here)
  // so before the function gets removed, also remove the changes made by that function (change false BACK to true)
  // how you can revert history back to original state to then derive new paths
  maze[row][col] = true;
  path[row][col] = 0;

  return newArr;
}

const board3: boolean[][] = [
  [true, true, true],
  [true, true, true],
  [true, true, true],
];

// const path: number[] = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];
// Correct way to initialize a 2D array
const path1: number[][] = Array.from({ length: board3.length }, () =>
  Array(board3[0].length).fill(0)
);
console.log(allPathsPrint(0, 0, board3, path1, 1)); // Start at (0, 0) instead of (3, 3)

// Question 6: print all paths (using step numbers)

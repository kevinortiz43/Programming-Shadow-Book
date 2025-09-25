// https://youtu.be/zg5v2rlV1tM?si=L10TQJuFsV1SWGcu

// Question 1: how many paths to get to finish point, if can move only down or right?

function mazeCount (row, col) {
    if (row === 1 || col === 1) return 1; // base case: return only 1 path
    
    let left = mazeCount(row-1, col);
    let right = mazeCount(row, col-1);

    return left + right;
}

console.log(mazeCount(3, 3)); // 6                

// Question 2: print all possible paths can reach finish point, if can move only down or right? (Hint: permutations question) // PRINT only, not put in array yet

function mazePaths (row, col, proc = '') {
       if (row === 1 && col === 1) {
        console.log(proc);
        return;
       };

       if (row > 1) mazePaths(row-1, col, proc + 'D');
       if (col > 1) mazePaths(row, col-1, proc + 'R');
}

mazePaths(3, 3);

// Question 2a: return in array - all possible paths can reach finish point, if can move only down or right? array in BODY

function mazePathArr (row, col, proc = '') {
   const newArr = [];
   
    if (row === 1 && col === 1) {
        return [proc];
       };

    
       if (row > 1) {
        const left = mazePathArr(row-1, col, proc + 'D');
        newArr.push(left);
       }

       if (col > 1) {
        const right = mazePathArr(row, col-1, proc + 'R');
        newArr.push(right);
       }

       return [left, right];
}

console.log(mazePathArr(3, 3));







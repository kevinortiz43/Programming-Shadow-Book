// https://youtu.be/lsOOs5J8ycw?si=b_cAf7P8IG8oGTCn

function arrowPattern(str: string, n: number): string | undefined {
  console.log(str);

  if (n === 1) {
    // base case
    return str;
  }
  arrowPattern(str + str[0], n - 1);
  console.log(str);
}
// arrowPattern('*', 5)

function arrowPattern1(str: string, n: number): void {
  for (let row = 0; row < 2 * n - 1; row++) {
    let totalColsInRow = row > n ? 2 * n - row : row;
    let strRow = "";
    for (let col = 0; col < totalColsInRow; col++) {
      strRow = strRow + str;
    }
    console.log(strRow);
  }
}

// arrowPattern1('*', 5)

// Question 28: diamond pattern

function diamond(str: string, n: number): void {
  for (let row = 0; row < 2 * n - 1; row++) {
    let totalColsInRow: number;

    if (row < n) {
      // Top half including middle row
      totalColsInRow = 2 * row + 1; // Odd numbers: 1, 3, 5, ...
    } else {
      // Bottom half
      totalColsInRow = 2 * (2 * n - 1 - row) - 1; // Decreasing odd numbers
    }

    let numSpaces = n - Math.ceil(totalColsInRow / 2);
    let spaceRow = "";
    let strRow = "";

    // Add leading spaces
    for (let space = 0; space < numSpaces; space++) {
      spaceRow += " ";
    }

    // Add stars
    for (let col = 0; col < totalColsInRow; col++) {
      strRow += str;
    }

    console.log(spaceRow + strRow);
  }
}

diamond("*", 5);

function diamond1(str: string, n: number): void {
  // Top half including middle
  for (let row = 1; row <= n; row++) {
    const stars = 2 * row - 1;
    const spaces = n - row;
    console.log(" ".repeat(spaces) + str.repeat(stars));
  }

  // Bottom half
  for (let row = n - 1; row >= 1; row--) {
    const stars = 2 * row - 1;
    const spaces = n - row;
    console.log(" ".repeat(spaces) + str.repeat(stars));
  }
}

diamond1("*", 5);

// Question 30: number pyramid pattern

function numPyramid(n: number) {
  for (let row = 1; row <= n; row++) {  // outer loop iterates < total number of rows
    let line = "";

    for (let emptySpace = 0; emptySpace < n - row; emptySpace++) { // number of spaces is n - row
      line += " ";
    }

    for (let col = row; col >= 1; col--) { // left half of triangle until reaches 1, i.e. 5, 4, 3, 2, 1
      line += col;
    }

    for (let col = 2; col <= row; col++) { // right half of triangle starting at 2, until reaches row, 2, 3, 4, 5
      line += col;
    }

    console.log(line);
  }
}

numPyramid(5);

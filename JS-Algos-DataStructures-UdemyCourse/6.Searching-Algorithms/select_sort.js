function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
}

const arr = [-3, 0, 12, 3, 5, 7, 13.5];

console.log(selectSort(arr));


// SELECTION SORT
// Ex 12: selection sort

function selection1(arr, row = arr.length, col = 0, max = 0) {
  if (row === 0) return arr;

  if (col < row) {
    if (arr[col] > arr[max]) {
      return selection1(arr, row, col + 1, col);
    } else {
      return selection1(arr, row, col + 1, max);
    }
  } else {
    // swap max with last element in current row
    let temp = arr[max];
    arr[max] = arr[row - 1];
    arr[row - 1] = temp;

    return selection1(arr, row - 1, 0, 0);
  }
}
console.log(selection1(arrE)); // [-3, -2, 0, 5, 6, 10]

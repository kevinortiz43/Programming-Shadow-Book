// compares pairs of adjacent els and the els are swapped if they are not in order

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) { // ascending order (if desc order, then change > to <)
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const array = [4, 7, 2, 9, 3, -10, -1, 0, 5];

console.log(bubbleSort(array));

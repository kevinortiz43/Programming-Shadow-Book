// builds up the sort by gradually creating a larger left half

//start by picking the second element in the array
// compare the second element with the one before it and swap if necessary
// continue to the next element and if it is in the incorrect order
// iterate through the sorted portion to place the element in the correct place
// repeat until the array is sorted

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let j = i - 1; // keep track of el left of index

    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr;
}

insertionSort([2, 1, 9, 76, 4]);

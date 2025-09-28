//

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let j = i - 1; // keep track of el left of index

    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

const array = [1, 49, -1, 3, 9, 6, 2];

console.log(insertSort(array));

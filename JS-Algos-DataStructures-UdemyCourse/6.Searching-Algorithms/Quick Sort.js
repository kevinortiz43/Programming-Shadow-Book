


// QUICK SORT

// Ex 15: Quick Sort

function quickSort(arr, low, high = arr.length) {
  if (low >= high) return; // if low is greater than or equal to high then return

  start = low; // start is equal to low
  end = high; // end is equal to high
  mid = Math.floor((start + ((end - start) / 2))); // get the mid point
  pivot = arr[mid]; // our pivot is the mid point of the array

  while (start <= end) {
    // while the start is less than the end or "while its unsorted"

    while (arr[start] < pivot) {
      start++; // while the first element of the array is less than the pivot then increase the start
    }

    while (arr[end] > pivot) {
      end--; // while the last element of the array is greater than the pivot then decrease the end
    }

    if (start <= end) {
      // if it is sorted
      let temp = arr[start]; // create a temp variable with the first element of this array
      arr[start] = arr[end]; //our first element of this array is now holding the last element of the array
      arr[end] = temp; // now the last element of the array now holds the tempp
      start++; // increase the start
      end--; // decrease the end

      // [5,4,3,2,1]
    }
    quickSort(arr, low, end);
    quickSort(arr, start, high);
  }
  return arr;
}

console.log(quickSort(arrE)); // [-3, -2, 0, 5, 6, 10]

//merge sort algorithm (Divide and Conquer)

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length/2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) { // helper function
  let result = [];
  let i = 0;
  let j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) { // push smaller values FIRST
      result.push(left[i]);
      i++
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  return result;
}


const unsorted = [1, 3, -1, 5, 7, -10, 0, 2];
console.log(mergeSort(unsorted)); // [-10, -1, 0, 1, 2, 3, 5, 7]









// MERGE SORT (DIVIDE & CONQUER)

// Ex 13: merge sort with helper where new array is created every time

function mergeSort(arr) {
  if (arr.length === 1) return arr;
  let mid = arr.length / 2;
  let left = mergeSort(arr.slice(0, mid)); // slice doesn’t include mid el
  let right = mergeSort(arr.slice(mid, arr.length));
  // start at mid since mid not included in left
  return merge(left, right); // sort and combine
}

function merge(first, second) {
  let result = [];

  let i = 0; // left half
  let j = 0; // right half
  let k = 0; // result arr

  while (i < first.length && j < second.length) {
    // as long as there is elements in the arrays we go insdie this while loop
    if (first[i] < second[j]) {
      // if the current element of the first array is less than the current element of the second array
      result[k] = first[i]; // populate the result array with that current element of the first array
      i++; // traverse the first array
    } else {
      // if the current element of the second array is less than the current element of the first array
      result[k] = second[j]; // populate our result array with the current element of the second arra
      j++; // traverse the second array
    }
    k++; // traverse the result array
  }
  while (i < first.length) {
    // while i
    result[k] = first[i];
    i++;
    k++;
  }
  while (j < second.length) {
    result[k] = second[j];
    j++;
    k++;
  }
  return result;
}

console.log(mergeSort(arrE)); // [-3, -2, 0, 5, 6, 10]



// Ex 14: merge sort (also with helper) where array is modified in place

function mergeSort1(arr, start = 0, end = arr.length) {
  // end msut be exclusive (rather than inclusive, i.e. arr.length - 1) due to this condition in line 365: while (i < mid && j < end)
  if (end - start <= 1) return arr;

  let mid = Math.floor((start + ((end - start) / 2)));

  mergeSort1(arr, start, mid);
  mergeSort1(arr, mid, end);

  merge1(arr, start, mid, end); // change orig arr
  return arr;
}

function merge1(arr, start = 0, mid, end = arr.length) {
  let result = []; // empty result array

  let i = start; // variable of i is our start (left half arr)
  let j = mid; // j is now our mid (right half arr)
  let k = 0; // k is 0

  while (i < mid && j < end) {
    // while our start is less than mid and our mid is less than end then merge sort

    if (arr[i] < arr[j]) {
      // while the first element of the array is less than the mid element of the array
      result[k] = arr[i]; // make the first element of the new array the element of the left hand array
      i++; // go to the next element of the left array
    } else {
      // if the first element of the array is greater than the mid element of the array
      result[k] = arr[j]; //make the element of the result array the element of array j
      j++; // go to the next element of the j
    }
    k++; // increase the results array placement
  }
  while (i < mid) {
    // while i or start is less than mid
    result[k] = arr[i]; // make the index k of result array the element of arr[i]
    i++; // increase i
    k++; // increase k
  }
  while (j < end) {
    // while the mid is less than end
    result[k] = arr[j]; // make the element of k the element of arr[j]
    j++; // increase j
    k++; // increase k
  }

  for (let m = 0; m < result.length; m++) {
    // for loop iterating the results array outside the while loop so at this point it has been sortedchange orig arr. Begin at start index and overwrite els incrementally to right of start position
    arr[start + m] = result[m]; // arr[start + 0] = results[0]
  }
}

const x = [5, 4, 3, 2, 1];
console.log(mergeSort1(x)); // [1, 2, 3, 4, 5]
console.log(mergeSort1(arrE)); // [-3, -2, 0, 5, 6, 10]




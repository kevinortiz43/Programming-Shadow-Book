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
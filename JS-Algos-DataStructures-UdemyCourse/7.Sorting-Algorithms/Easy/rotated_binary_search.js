function rBinSearchIter(arr, targ) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    if (arr[mid] === targ) return mid;

    // Check if left side is sorted
    if (arr[start] <= arr[mid]) {
      // Target is in left sorted portion
      if (targ >= arr[start] && targ < arr[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {  // Right side is sorted
      if (targ > arr[mid] && targ <= arr[end]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }

  return -1; // not found
}

const arrD = [5, 6, 7, 8, 9, 1, 2, 3];
console.log(rBinSearchIter(arrD, 9)); // 4
console.log(rBinSearchIter(arrD, 2)); // 6
console.log(rBinSearchIter(arrD, 10)); // -1


const arrX = [6, 1, 2, 3, 4, 5];
const arrZ = [2, 3, 4, 5, 6, 1];

 console
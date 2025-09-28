//from Brocode vid (interpreted from Java)

function interSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  // The loop continues as long as 'low' is less than or equal to 'high',
  // and the 'target' is within the range of values in the current search space.
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // If the low and high values are the same, check if it's the target.
    if (low === high) {
      if (arr[low] === target) {
        return low;
      } else {
        return -1; // Target not found
      }
    }

    // Calculate the estimated position of the target.
    // This formula is based on the assumption of a uniformly distributed array.
    let pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));

    // Check if the target is found at the calculated position.
    if (arr[pos] === target) {
      return pos;
    }

    // If the element at 'pos' is less than the target, search the right half.
    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      // If the element at 'pos' is greater than the target, search the left half.
      high = pos - 1;
    }
  }

  return -1; // Target not found
}

// Example usage:
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const index = interSearch(arr, 8);
console.log(index);

const arr1 = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
const index1 = interSearch(arr1, 256);
console.log(index1);
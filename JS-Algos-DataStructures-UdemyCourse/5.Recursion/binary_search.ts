// https://youtu.be/W9QJ8HaRvJQ?si=sI2UjB4SEijiyCVm

// Question 0a: regular binary search (recursive)
let arr = [2, 3, 5, 9, 14, 16, 18];
let target = 17;

function binarySearch(
  arr: number[],
  target: number,
  start: number = 0,
  end: number = arr.length - 1
): number {
  let mid = start + Math.floor((end - start) / 2);

  if (start > end) return -1;

  // while (start <= end) {
  if (target === arr[mid]) {
    return mid;
  }

  if (target < arr[mid]) {
    // left side
    return binarySearch(arr, target, start, mid - 1);
  } else {
    // right side
    return binarySearch(arr, target, mid + 1, end);
  }
}

console.log(binarySearch(arr, 3)); // 1

// Question 0b: regular binary search (iterative)
function binarySearch3(array: number[], key: number): number {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    // or start + Math.floor((end - start) / 2)
    if (array[mid] === key) {
      return mid;
    }
    if (array[mid] < key) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

console.log(binarySearch3(arr, 3));

// Question 1: ceiling binary search

function binarySearchCeiling(
  arr: number[],
  target: number,
  start: number = 0,
  end: number = arr.length - 1
): number {
  if (target > arr[arr.length - 1]) return -1;

  let mid = start + Math.floor((end - start) / 2);

  if (start > end) return start;
  // while (start <= end) {
  if (target === arr[mid]) {
    return mid;
  }

  if (target < arr[mid]) {
    // left side
    return binarySearchCeiling(arr, target, start, mid - 1);
  } else {
    // right side
    return binarySearchCeiling(arr, target, mid + 1, end);
  }
}

console.log(binarySearchCeiling(arr, 4)); // 2

// Question 1a: iterative version (more efficient)

function binarySearchCeilingWhile(arr: number[], target: number): number {
  if (target > arr[arr.length - 1]) return -1;

  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    if (target === arr[mid]) {
      return mid;
    }

    if (target < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
}

console.log(binarySearchCeilingWhile(arr, 4)); // 2

// Question 2: floor binary search

function binarySearchFloor(
  arr: number[],
  target: number,
  start: number = 0,
  end: number = arr.length - 1
): number {
  if (target < arr[0]) return -1;

  let mid = start + Math.floor((end - start) / 2);

  if (start > end) return end;

  // while (start <= end) {
  if (target === arr[mid]) {
    return mid;
  }

  if (target < arr[mid]) {
    // left side
    return binarySearchFloor(arr, target, start, mid - 1);
  } else {
    // right side
    return binarySearchFloor(arr, target, mid + 1, end);
  }
}

console.log(binarySearchFloor(arr, 15)); // 4

// Question 3: Leetcode 744 - find smallest letter greater than target

function smallestLetter(arr: string[], target: string): string {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    // if (target === arr[mid]) { // delete this since not checking equal
    //     return mid;
    // }

    if (target < arr[mid]) {
      // left side
      end = mid - 1;
    } else {
      // right side
      start = mid + 1;
    }
  }

  return arr[start % arr.length]; // this handles all cases: target found within arr, target > all elements in arr (wrap-around), target < 1st el, edge case: if start > end (violate while loop condition)

  // return start === arr.length ? arr[0] : arr[start]; // alternative to using modulus
}

const arr1 = ["c", "f", "j"];

console.log(smallestLetter(arr1, "d")); // 2

// Question 4: Leetcode 34 find indices of 1st and last index of target (assuming target has duplicates)

function binarySearchFirstLastIndx(arr: number[], target: number): number[] {
  let ans = [-1, -1];

  // run binary search twice -> once for start index, another for end index
  ans[0] = search(arr, target, true); // ans[0] is start or left index
  if (ans[0] !== -1) {
    // if start isn't -1, only then check for end
    ans[1] = search(arr, target, false); // ans[1] is end or right index
  }
  return ans;
}

// helper func returning index value of target
function search(
  arr: number[],
  target: number,
  findStartIndex: boolean
): number {
  let ans = -1;
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    // search for 1st occurrence of target
    if (target < arr[mid]) {
      // left side
      end = mid - 1;
    } else if (target > arr[mid]) {
      // right side
      start = mid + 1;
    } else {
      // target = arr[mid] so 1st target occurrence has been found
      ans = mid; // reassign ans to potential ans
      if (findStartIndex) {
        end = mid - 1; // if true, then check left side for start index
      } else {
        // if false, check right side for end index
        start = mid + 1;
      }
    }
  }
  return ans;
}

const arr2 = [5, 7, 7, 7, 7, 8, 8, 10];
console.log(binarySearchFirstLastIndx(arr2, 7)); // [1, 4]

function binarySearchFirstLastIndex(nums: number[], target: number): number[] {
  function binarySearch(
    nums: number[],
    target: number,
    isSearchingLeft: boolean
  ): number {
    let left = 0;
    let right = nums.length - 1;
    let idx = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] > target) {
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        idx = mid;
        if (isSearchingLeft) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
    }
    return idx;
  }

  const left = binarySearch(nums, target, true);
  const right = binarySearch(nums, target, false);

  return [left, right];
}

// Test the function
const arr3 = [5, 7, 7, 7, 7, 8, 8, 10];
console.log(binarySearchFirstLastIndex(arr3, 7)); // [1, 4]





// Question 5: searching for target in array when don't know length (infinite arr)

function binaryInfinite(arr: number[], target: number): number {
  // first find the range
  // first start with box size of 2
  let start = 0;
  let end = 1;

  // condition for target to lie in range
  while (target > arr[end]) { // right half of array
    let newStart = end + 1; 
    end = end + 2 * (end - start); // to double size of search window
    start = newStart;
  }
  return binarySearch(arr, target, start, end); // same as regular binary search above
}

 //           0  1  2  3  4  5  6   7   8   9   10  11  12  13  14  15               
const arr4 = [2, 3, 5, 6, 7, 8, 10, 11, 12, 15, 20, 23, 30, 32, 33, 34];

console.log(arr4.length);
console.log(binaryInfinite(arr4, 34)); // 15


// https://youtu.be/W9QJ8HaRvJQ?si=sI2UjB4SEijiyCVm

// Question 1: regular binary search
let arr = [2, 3, 5, 9, 14, 16, 18];
let target = 17;

function binarySearch(arr: number[], target: number,start: number = 0,end: number = arr.length - 1): number {
  
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

  console.log(binarySearch(arr, 3)) // 1


// Question 2: ceiling binary search

function binarySearchCeiling(arr: number[], target: number,start: number = 0,end: number = arr.length - 1): number {
  
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

  console.log(binarySearchCeiling(arr, 4)) // 2

// Question 3: floor binary search

function binarySearchFloor(arr: number[], target: number,start: number = 0,end: number = arr.length - 1): number {
  
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

console.log(binarySearchFloor(arr, 15)) // 4


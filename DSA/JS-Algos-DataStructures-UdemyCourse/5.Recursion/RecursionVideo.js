// from recursion vid https://youtube.com/playlist?list=PL9gnSGHSqcnp39cTyB1dTZ2pJ04Xmdrod&si=CKOq1paa1WuObsWy

// Ex 1: fib with memoization
function fib(n, memo = []) {
  if (memo[n] != null) return memo[n]; // if value already exists (already calculated) return value
  if (n < 2) return n; // base condition
  const result = fib(n - 1, memo) + fib(n - 2, memo); // first 2 branch split
  memo[n] = result;
  return result;
}

console.log(fib(4)); // 3




// Ex 2a: reverse number using recursion

function rev1(n, sum = 0) {
  if (n === 0) return sum; // base case to return reversed num
  let remainder = n % 10; // how to access last num
  sum = sum * 10 + remainder;
  return rev1(Math.floor(n / 10), sum); // taking off last num, always use Math.floor()
}

console.log(rev1(4321)); // 1234





// Ex 2b with helper function / boolean output
function rev2(n) {
  if (n === 0) return 0; // special case for 0, as log10(0) is -Infinity
  let digits = Math.floor(Math.log10(Math.abs(n))) + 1; // formula for finding number of digits
  return helper(n, digits); // helper function
}

function helper(n, digits) {
  if (digits === 1) return n; // base case: when single digit remaining
  let rem = n % 10;
  return (
    rem * Math.pow(10, digits - 1) + helper(Math.floor(n / 10), digits - 1)
  ); // formula for reversing the number
}

function palin(n) {
  // will return true / false
  return n == rev2(n); // check if reverse number is same as number
}

console.log(palin(1331)); // true
console.log(palin(2345086)); // false





// Ex 3a: Count number of zeroes in digit
// let digits = Math.floor(Math.log10(Math.abs(n))) + 1; // This does NOT work if number is 0 or negative
// if (digits === 1) return count; // NOT best base case

function countZero(n, count = 0) {
  if (n === 0) return count; // this is simplest base case
  let lastDig = n % 10;
  if (lastDig === 0) {
    // be more specific that LAST digit = 0, NOT n = 0
    return countZero(Math.floor(n / 10), count + 1);
  } else {
    return countZero(Math.floor(n / 10), count);
  }
}
console.log(countZero(30204)); // 2
// console.log(countZero(00204)); // this would be problematic with leading zeroes





// Ex 3b with string input
// if having zeroes, have to input num as string. It'll be problematic if you try converting String(num) inside func since it would convert to '204' NOT '00204'

function countZeroStr(str, i = 0, count = 0) {
  if (i === str.length) return count;
  if (str[i] === "0") {
    return countZeroStr(str, i + 1, count + 1);
  } else {
    return countZeroStr(str, i + 1, count);
  }
}
console.log(countZeroStr("30204")); // 2
console.log(countZeroStr("00204")); // 3





//Ex 4: how many steps to reach a certain number;
function numOfSteps(n) {
  return helper1(n, 0);
}

function helper1(n, steps) {
  if (n === 0) return steps; // base case
  if (n % 2 === 0) return helper1(n / 2, steps + 1); // if even
  return helper1(n - 1, steps + 1); // if odd
}

console.log(numOfSteps(41)); // 8






// Ex 5: Find if array is sorted with ascending vals or not, with recursion

function sorted(arr, i = 0) {
  // IMPRT: arr is NOT being modified, pointing to same arr
  if (i === arr.length - 1) return true;
  return arr[i] < arr[i + 1] && sorted(arr, i + 1);
}

const arrA = [1, 2, 9, 8, 7, 12];
const arrB = [1, 2, 4, 9, 12];
console.log(sorted(arrA)); // false
console.log(sorted(arrB)); // true



//Ex 6: linear search: check if target is in array
function findInd(arr, target, i = 0) {
  if (i === arr.length) return -1; // base case, if target not found
  if (arr[i] === target) return i;
  return findInd(arr, target, i + 1); // searching forward
}

console.log(findInd(arrA, 7)); // 4
console.log(findInd(arrB, 0)); // -1



// searching backwards from end to start
function findIndLast(arr, target, i = arr.length-1) {
  if (i === -1) return -1; // base case, if target not found
  if (arr[i] === target) return i;
  return findIndLast(arr, target, i - 1);
}

console.log(findInd(arrA, 7)); // 4
console.log(findIndLast(arrB, 9)); // 3




// Ex 7a: find all indices for a target, result array in PARAMETER

function findAllInd(arr, target, i = 0, newArr = []) {
  // passing value of newArr reference
  if (i === arr.length) return newArr; // base case, if traversed whole list
  if (arr[i] === target) newArr.push(i);
  return findAllInd(arr, target, i + 1, newArr); // searching forward
}

const arrC = [1, 3, 2, 5, 2, 6];
console.log(findAllInd(arrC, 2)); // [2, 4]


// Ex 7b: find all indices for target, result array NOT in parameter (in function body)

function findAllInd2(arr, target, i = 0) {
  // passing value of newArr reference
  const newArr = [];
  if (i === arr.length) return newArr; // base case, if traversed whole list
  if (arr[i] === target) newArr.push(i);

  let ansFromBelowCalls = findAllInd2(arr, target, i + 1);
  // searching forward
  newArr.push(...ansFromBelowCalls);
  //  newArr.concat(ansFromBelowCalls); // not correct to use concat here
  return newArr;
}

console.log(findAllInd2(arrC, 2)); // [2, 4] 



// Ex 7c: binary search - Write a recursive function that determines if a number is in an ordered array and if so, returns index. Assume the array is sorted.  

function findInOrdSet (arr, n, start = 0, end = arr.length - 1) {
    const mid = Math.floor((start + ((end - start) / 2))); // could also be Math.trunc() 

 const midVal = arr[mid];    
    if (start > end) return -1; // return -1 if not found
    if (arr[start] > arr[end]) { // partially check if sorted array by looking at endpts
        throw new Error('not sorted array');
    }  

    if (midVal === n) return mid; 

    if (n < midVal) { // search left side
        return findInOrdSet (arr, n, start, mid - 1);
    } else { // search right side
        return findInOrdSet (arr, n, mid + 1, end);
    }
}

const arrB1 = [1, 2, 3, 4, 5, 6]
console.log(findInOrdSet(arrB1, 5)) // 4




// Ex 8: ROTATED binary search (twist on regular binary search)
// array has to be sorted for binary search to work

function rBinSearch(arr, targ, start = 0, end = arr.length - 1) {
  // start / end refer to index
  if (start > end) return -1;

  let mid = Math.floor((start + ((end - start) / 2)));

  if (arr[mid] === targ) return mid;

  // if left side side is sorted
  if (arr[start] <= arr[mid]) {
    if (targ >= arr[start] && targ <= arr[mid]) {
      return rBinSearch(arr, targ, start, mid - 1); // search left side
    } else {
      // search right side of arr
      return rBinSearch(arr, targ, mid + 1, end); // search right side
    }
  }
  // else right side must be sorted
  if (targ >= arr[mid] && targ <= arr[end]) {
    return rBinSearch(arr, targ, mid + 1, end); // search right
  }
  return rBinSearch(arr, targ, start, mid - 1); // search left
}
const arrD = [5, 6, 7, 8, 9, 1, 2, 3];
console.log(rBinSearch(arrD, 9)); // 4
console.log(rBinSearch(arrD, 2)); // 6






// PATTERN questions

// Ex 9: cascade

function cascade(number) {
  console.log(number);
  if (number < 10) return; // base case: single integer
  if (number < 0 || typeof number !== `number`)
    throw new Error(`Enter a positive number`);
  const smallerNumber = Math.floor(number / 10);
  cascade(smallerNumber);
  console.log(number);
}
cascade(123); // 123, 12, 1, 12, 123 

// Ex 10: triangle pattern A

//    0   1   2   3
// 4 ☆  ☆ ☆ ☆
// 3 ☆  ☆ ☆
// 2 ☆  ☆
// 1 ☆

function triangle(row, col = 0, line = "") {
  if (row === 0) return;

  if (col < row) {
    // build a line by concatenating stars
    triangle(row, col + 1, line + `☆`);
  } else {
    // when row is done, print the line
    console.log(line);
    triangle(row - 1, 0, "");
  }
}

triangle(4);

// triangle pattern B

function triangle2(row, col = 0, line = "") {
  if (row === 0) return;

  if (col < row) {
    triangle2(row, col + 1, line + `☆`);
  } else {
    triangle2(row - 1, 0, "");
    console.log(line);
  }
}

triangle2(4);




// BUBBLE SORT
// Ex 11: bubble sort

function bubble(arr = [], row = arr.length - 1, col = 0) {
  if (row === 0) return;

  if (col < row) {
    if (arr[col] > arr[col + 1]) {
      let temp = arr[col]; // swap with adjacent element
      arr[col] = arr[col + 1];
      arr[col + 1] = temp;
    }
    bubble(arr, row, col + 1);
  } else {
    bubble(arr, row - 1, 0);
  }
  return arr;
}

const arrE = [5, -3, 6, 0, -2, 10];
console.log(bubble(arrE)); // [-3, -2, 0, 5, 6, 10]




// SELECTION SORT
// Ex 12: selection sort

function selection1(arr, row = arr.length, col = 0, max = 0) {
  if (row === 0) return arr;

  if (col < row) {
    if (arr[col] > arr[max]) {
      return selection1(arr, row, col + 1, col);
    } else {
      return selection1(arr, row, col + 1, max);
    }
  } else {
    // swap max with last element in current row
    let temp = arr[max];
    arr[max] = arr[row - 1];
    arr[row - 1] = temp;

    return selection1(arr, row - 1, 0, 0);
  }
}
console.log(selection1(arrE)); // [-3, -2, 0, 5, 6, 10]




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





// STRING PROBLEMS

// Ex 16a: given a str, skip letter -> remove all 'a's, print result str in PARAMETER (NOTE: this returns undef, just prints)

function skip(unproc, proc = '') {
  if (unproc.length === 0) { // base case
    console.log(proc);
    return; 
  }
  let char = unproc.charAt(0);
  if (char === "a") skip(unproc.slice(1), proc);
  else skip(unproc.slice(1), proc + char);
}
skip("baccdab"); // prints 'bccdb'

// Ex 16b: same as above, but this time returns str as value

function skip(unproc, proc = '') {
  if (unproc.length === 0) { // base case
    return proc; 
  }

  let char = unproc.charAt(0);

  if (char === "a") {
    return skip(unproc.slice(1), proc);
  } else {
    return skip(unproc.slice(1), proc + char);
  }
}

console.log(skip("baccdab")); // "bccdb"


// Ex 16c: same as above, but result str in func body, NOT parameter

function skip1(unproc) {
  if (unproc.length === 0) return ""; // base case
  let char = unproc.charAt(0);
  if (char === "a") return skip1(unproc.slice(1));
  else return char + skip1(unproc.slice(1));
}
console.log(skip1("baccdab")); // 'bccdb'




// Ex 17: given str, skip whole word
// Question: Let’s say you want to skip an entire str

function skipApple(unproc) {
  if (unproc.length === 0) return ""; // if unproc.length === 0 then it is processed
  if (unproc.startsWith("apple")) return skipApple(unproc.slice(5));
  // if it has apple in the word then slice off the length
  else return unproc.charAt(0) + skipApple(unproc.slice(1)); // traverse the array
}
console.log(skipApple("bcbapplefg")); // bdbfg


// Ex 18: given str, only remove ‘app’ but if ‘apple’, don't remove anything

function skipAppNotApple(unproc) {
  if (unproc.length === 0) return ''; // base case 
  if (unproc.startsWith('app') && !unproc.startsWith('apple')) {
    // if our unproc has 'app' but NOT apple then slice off 'app'
    return skipAppNotApple(unproc.slice(3)); // we slice 3 characters to match 'app'
  } else {  // continue traversing our unprocessed string
    return unproc.charAt(0) + skipAppNotApple(unproc.slice(1)); 
  }
}
console.log(skipAppNotApple("bcbapplefg")); // bcbapplefb
console.log(skipAppNotApple("bcbappfg")); // bcbfg




/*
SUBSETS

Ex. 19: 
Question: get ALL subsets of str ‘abc’ (same order, NOT permutations)
figure out 1st what the answer would be
ans: [‘a’, ‘b’, ‘c’, ‘ab’, ‘ac’, ‘bc’, ‘abc’]

Subset Pattern - taking some els and removing some els

processed / unprocessed 
     / abc   for every char, 2 choices -> either take char OR ignore char
     a / bc	 OR      / bc
         ^
ab / c   a / c 

*/

// Ex 19: Get all combinations of letters
// printing the letters (not returning any values), return value will be undefined

function subseq(unproc, proc = '') {
  if (unproc === "") {
    console.log(proc);
    return;
  }
  let first = unproc.charAt(0);
  subseq(unproc.slice(1), proc + first);
  // left branch recursive calls, where you include the 1st char, iterate to next char by slicing
  subseq(unproc.slice(1), proc);
  // right branch recursive calls, where you ignore the 1st char, iterate to next char by slicing
}

console.log(subseq("abc")); // abc, ab, ac, a, bc, b, c




// Ex 20a: with results array being IN THE PARAMETER and modified every iteration

function subseqArrayIn(unproc, proc = '', results = []) {
  if (unproc === "") {
  
    results.push(proc);
    return results;
  }

  let first = unproc.charAt(0);
  subseqArrayIn(unproc.slice(1), proc + first, results); // include first char
  subseqArrayIn(unproc.slice(1), proc, results); // exclude first char
  
  return results;
}
console.log(`example 20 subseqArrayIn`)
console.log(subseqArrayIn("abc"));
// Output: ['abc', 'ab', 'ac', 'a', 'bc', 'b', 'c', '']






// Ex 20b: Get all combos and put into result array (NOT having array in PARAMETER)
function subseqArray(unproc, proc ='') {
  if (unproc === "") return [proc];

  let first = unproc.charAt(0);

  // Collect results from both branches
  const includeFirst = subseqArray(unproc.slice(1), proc + first);
  const excludeFirst = subseqArray(unproc.slice(1), proc);

  return [...includeFirst, ...excludeFirst];
}

console.log(subseqArray("abc"));





// Ex 20c: with putting subsets into array (NOT having array in PARAMETER)

function subseqRet(unproc, proc="") {
  // function subeqRet with parameters of processed (proc) and uprocessed (unproc) strings

  if (unproc === "") return [proc]; // base case returns array with single subsequence

  let first = unproc.charAt(0);

  // Get results from recursive calls (these are already arrays)
  const left = subseqRet(unproc.slice(1), proc + first); // include first char
  const right = subseqRet(unproc.slice(1), proc); // exclude first char

  // return left.concat(right);
  return [...left, ...right]
}

console.log(subseqRet("abc"));







/* 
Ex 21:
Question: given str ‘ab’, print all the ASCII values of the character 
Every char / letter has an ASCII value (number value) (pronounced ‘as-ki’)
unprocessed, processed

This would require 3 recursive calls: 
either take char, ignore char, convert char to ASCII

proc / unproc

empty / ab
3 recursive calls:
a / b       	convert to 97 (ASCII value of a) / b    	ignore a / b

char.charCodeAt(0) // convert char to ASCII (0 indicates 1st char in string)

input: ab

work done:     

return the first character
1.  a/b

ignore the first character
2. b

convert characters to ascii
3. 97
*/

// Ex 21a: Printing str with all possible combos of chars, including option to change char to ASCII value
  // function subseqAsciiRet with two parameters processed (proc) and unprocessed(unproc) string using recursion
  // Goal is to return a string with with all possible combos of that string.
  // 1. either include a characters
  // 2. don't include a character
  // 3. change the character to ASCII value


function subseqAscii(unproc, proc = '') {
  if (unproc.length === 0) {
    console.log(proc);
    return proc;
  }

  let char = unproc.charAt(0);

  subseqAscii( unproc.slice(1),proc + char); //includes the first character in the return [a/b] -> [a/b]
  subseqAscii(unproc.slice(1), proc); //do not include the first character in the return [a/b] -> [b]
  subseqAscii(unproc.slice(1), proc + char.charCodeAt(0)); // convert the character to ASCII values [a/b] ->[97]
}

console.log(subseqAscii('abc')) // returns undefined but prints all combos





/* Ex 21b: Same as Ex. 21a except put results into an arr

1. [a/b]
2. [b]
3. [97]

[a/b].concat([b])

[a/b,b].concat([97])

[a/b, b, 97]

// result
[a/b, b, 97]

*/

// Ex 21b: Returning results arr with all possible combos of chars including option to change char to ASCII value

function subseqAsciiRet(unproc, proc="") {
  // function subseqAsciiRet with two parameters processed (proc) and unprocessed(unproc) string using recursion
  // Goal is to return an array with with all possible combos of a string.
  // 1. either include a characters
  // 2. don't include a character
  // 3. change the character to ASCII value

  if(typeof unproc !=="string") return "invalid input" //edge case if the unprocessed string is not a string

  unproc = String(unproc); // edge case if we don't care what is thrown in its going to be a string. if they give us boolean of true or false guess what its a string now and processed

  if (unproc.length === 0) return [proc]; //base case, retuned processed str inside array

  // three empty arrays showing the 3 paths our recursion will have to take

  let char = unproc.charAt(0); // retrieve a character at a specified position within a string. In this case it is the first character or letter of our string

  const first =subseqAsciiRet(unproc.slice(1), proc+char); // this recursion call will include the first character
  const second =subseqAsciiRet(unproc.slice(1),proc); // this recursion call will not include the first character
  const third = subseqAsciiRet(unproc.slice(1), proc + char.charCodeAt(0)); // this recursion call will change the first character to ASCII

  // return first.concat(second).concat(third)
  return [...first, ...second, ...third]; // add first, second, third together
}

console.log("Example 22 subseqAcIIRet")
console.log(subseqAsciiRet('abc'));






// Ex 22: Finding all subsets, given input array of values

function subset(arr) {
  // function with the name of subset and a parameter called arr. Goal is to place arrays into another array as a subarray
  let outer = [[]]; // out array containing sub arrays

  for (let num of arr) {
    // e.g.  // [1, 2, 3] keep iterating over 1, 2, 3

    let n = outer.length;
    // n is length of current version of outer array → keep changing as we keep adding subarrays into outer array

    for (let i = 0; i < n; i++) {
      let internal = [...outer[i]]; // creates an array called internal and populate it with elements from an existing array (outer)
      internal.push(num); // we push the elements (num) from arr (this functions parameter) into the internal array
      outer.push(internal); // we then push the internal array with all the elements from this functions parameter into the outer array.
      //  which then looks like a multi-dimensional array (or arrays with subarrays)  [[]]
    }
  }
  return outer;
}

const arrH = [1, 2, 3];
console.log(subset(arrH)); // [ [], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3] ]

/*
Iterative solution to find subsets
example: [1, 2, 3]
either: ignore 1        OR         include 1
[ ] 		          OR 	 [1]
with 2:
either: ignore 2         OR        include 2
[ ]                [ 1 ]          OR        [2]  [1,2]
 
either: ignore 3         OR        include 3
[ ]   [1]  [2]  [1, 2]         OR	 [3]  [1, 3]  [2, 3]  [1, 2, 3]
*/



// Ex 23: Given input arr of els, finding all subsets of els but excluding duplicate subsets (ok to have duplicate els inside subsets)

//  for [1,2,1,2]
// [1,1] is fine
// [1,1], [1,1] is not fine

//Ex 23: find all unique subsets, but remove duplicate subsets

function subsetDuplicates(array) {
  array.sort((a, b) => a - b); // numeric sort in ascending order
  console.log(array);
  let outer = [[]];
  let start = 0;
  let end = 0;

  for (let i = 0; i < array.length; i++) {
    start = 0;

    // if current and previous element is same start = end +1
    if (i > 0 && array[i] == array[i - 1]) {
      start = end + 1;
    }
    end = outer.length - 1;
    let n = outer.length;
    for (let j = start; j < n; j++) {
      const internal = [...outer[j],array[i]];
      // internal.push(array[i])
      outer.push(internal);
    }
  }
  return outer;
}
const arrF = [1, 2, 2];
const arrG = [1,2,1,2];
console.log(subsetDuplicates(arrF)); // [ [], [1], [2], [1,2], [2,2], [1,2,2] ]
console.log(subsetDuplicates(arrG)); // [ [], [1], [1,1], [2], [1,2], [1,1,2], [2,2], [1,2,2], [1,1,2,2] ]



//PERMUTATIONS

// ex 24: Print all permutations (no return value, undefined)

function permutations (unproc, proc = '') {
  if (unproc.length === 0) {
    console.log(proc);
    return; 
  }
  let char = unproc.charAt(0);

  for (let i = 0; i <= proc.length; i++) {
    let first = proc.slice(0, i);
    let second = proc.slice(i, proc.length);
    permutations(unproc.slice(1), first + char + second)
  }
}

permutations('abc'); // will return undefined but print cba, bca, bac, cab, acb, abc




// ex 25a: Put all permutations in array where results array NOT in PARAMETER (but in func body)

function permutationsArray (unproc, proc = '') {
  if (unproc.length === 0) {
    return [proc]; 
  }

  let char = unproc.charAt(0);
  let answer = [];

  for (let i = 0; i <= proc.length; i++) {
    let first = proc.slice(0, i); // substr from start to i
    let second = proc.slice(i, proc.length); // substr from i to end
    answer.push(...permutationsArray(unproc.slice(1), first + char + second))
  }
  return answer
}

console.log(permutationsArray('abc'));





// Ex 25b: Put all permutations in arr, where results array is in PARAMETER

function permutationsArray1(unproc, proc = '', answers = []) {
  if (unproc.length === 0) {
    answers.push(proc); 
    return answers; 
  }

  let char = unproc.charAt(0);

  for (let i = 0; i <= proc.length; i++) {
    let first = proc.slice(0, i);
    let second = proc.slice(i);
    permutationsArray1(unproc.slice(1), first + char + second, answers);
  }
  return answers;
}

console.log(permutationsArray1('abc'));



// Ex 26a: count permutations in arr, where count in BODY 

function permutationsCount (unproc, proc = '') {
  if (unproc.length === 0) {
    // console.log(proc);
    return 1; 
  }

  let count = 0;
  let char = unproc.charAt(0);

  for (let i = 0; i <= proc.length; i++) {
    let first = proc.slice(0, i);
    let second = proc.slice(i, proc.length);
    count = count + permutationsCount(unproc.slice(1), first + char + second)
  }
  return count;
}

console.log(permutationsCount('abc')); // 6


// Ex 26b: count perm in arr, where count and arr is in PARAMETER. Assign counter an OBJECT with key count and value 0.

function permutationsCount1(unproc, proc = '', answers = [], counter = {count: 0} ) {
  if (unproc.length === 0) {
    answers.push(proc);
    counter.count++;
    return;
  }

  let char = unproc.charAt(0);

  for (let i = 0; i <= proc.length; i++) {
    let first = proc.slice(0, i);
    let second = proc.slice(i);
    permutationsCount1(unproc.slice(1), first + char + second, answers, counter);
  }

  return [answers, counter];
}

console.log(permutationsCount1('abc')); // [ ['cba', 'bca', 'bac', 'cab', 'acb', 'abc'], {count: 6}]




// Ex 26c: count perm in arr, where arr is in PARAMETER and the count is returned using array.length

function permutationsCount2(unproc, proc = '', answers = []) {
  if (unproc.length === 0) {
    answers.push(proc);
    return;
  }

  let char = unproc.charAt(0);

  for (let i = 0; i <= proc.length; i++) {
    let first = proc.slice(0, i);
    let second = proc.slice(i);
    permutationsCount2(unproc.slice(1), first + char + second, answers);
  }

  return [answers, answers.length];
}

console.log(permutationsCount2('abc')); // [ ['cba', 'bca', 'bac', 'cab', 'acb', 'abc'], 6]


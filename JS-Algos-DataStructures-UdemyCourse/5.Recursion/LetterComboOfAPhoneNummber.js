// https://youtu.be/9ByWqPzfXDU?si=fwK1LKa58KQA75iE

/*
https://leetcode.com/problems/letter-combinations-of-a-phone-number/
Leetcode Question: letter combos of phone number
Given str containing digits from 2-9 inclusive, return all possible letter combos that the number could represent. Return answer in any order.
A mapping of digit to letters (just like on phone buttons) given below. Note that 1 doesn’t map to any letters.
*/

// printing the combos
function pad(up, p = "") {
  if (up === "") {
    console.log(p);
    return p;
  }

  let current = up[0]; // get only 1st char in str
  let currDigit = parseInt(current);
  console.log(currDigit);

  for (let i = (currDigit - 1) * 3; i < currDigit * 3; i++) { // range of index
    let charAsc = 97 + i; // ASCII val of 'a' -> 97
    let char = String.fromCharCode(charAsc); // convert ASCII back to char
    pad(up.slice(1), p+char);
}
}
pad("12");

// putting combos into an arr, where result arr NOT in parameters
function padArr(up, p = "") {
  if (up === "") {
    return [p];
  }

  let current = up[0]; // get only 1st char in str
  let currDigit = parseInt(current);
  console.log(currDigit);

  let resultsArr = [];

  for (let i = (currDigit - 1) * 3; i < currDigit * 3; i++) { // range of index
    let charAsc = 97 + i; // ASCII val of 'a' -> 97
    let char = String.fromCharCode(charAsc); // convert ASCII back to char
    resultsArr.push(...padArr(up.slice(1), p+char));
  }
  return resultsArr;
}

console.log(padArr("12"));


// putting combos into an arr, where result arr IN PARAMETER
function padArr1(unproc, proc = "", results = []) {
  if (unproc === "") {
    results.push(proc);
    return results;
  }

  let current = unproc[0]; // get only 1st char in str
  let currDigit = parseInt(current);
  // console.log(currDigit);

  for (let i = (currDigit - 1) * 3; i < currDigit * 3; i++) { // range of index
    let charAsc = 97 + i; // ASCII val of 'a' -> 97
    let char = String.fromCharCode(charAsc); // convert ASCII back to char
    padArr1(unproc.slice(1), proc+char, results);
  }
  return results;
}

console.log(padArr1("12"));


// getting count of all combos, where results arr IN PARAMETER, with .length
function padArrCount(unproc, proc = "", results = []) {
  if (unproc === "") {
    results.push(proc);
    return proc;
  }

  let current = unproc[0]; // get only 1st char in str
  let currDigit = parseInt(current);
  // console.log(currDigit);

  for (let i = (currDigit - 1) * 3; i < currDigit * 3; i++) { // range of index
    let charAsc = 97 + i; // ASCII val of 'a' -> 97
    let char = String.fromCharCode(charAsc); // convert ASCII back to char
    padArrCount(unproc.slice(1), proc+char, results);
  }
  return [results,results.length];
}

console.log('count .length', padArrCount("12"));


// getting count of all combos, where results arr IN PARAMETER, with counter obj
function padArrCount1(unproc, proc = "", results = [], counter = {count: 0}) {
  if (unproc === "") {
    results.push(proc);
    counter.count++;
    return proc;
  }

  let current = unproc[0]; // get only 1st char in str
  let currDigit = parseInt(current);
  // console.log(currDigit);

  for (let i = (currDigit - 1) * 3; i < currDigit * 3; i++) { // range of index
    let charAsc = 97 + i; // ASCII val of 'a' -> 97
    let char = String.fromCharCode(charAsc); // convert ASCII back to char
    padArrCount1(unproc.slice(1), proc+char, results, counter);
  }
  return [results,results.length];
}

console.log('count obj', padArrCount1("12"));


// getting count of all combos, where results arr IN PARAMETER, with count in BODY
function padArrCount2(unproc, proc = "", results = [], counter = {count: 0}) {
  if (unproc === "") {
    // results.push(proc);
    return 1;
  }

  let current = unproc[0]; // get only 1st char in str
  let currDigit = parseInt(current);
  let count = 0;

  for (let i = (currDigit - 1) * 3; i < currDigit * 3; i++) { // range of index
    let charAsc = 97 + i; // ASCII val of 'a' -> 97
    let char = String.fromCharCode(charAsc); // convert ASCII back to char
    count = count + padArrCount2(unproc.slice(1), proc+char, results, counter);
  }
  return count;
}

console.log('count body', padArrCount2("12"));



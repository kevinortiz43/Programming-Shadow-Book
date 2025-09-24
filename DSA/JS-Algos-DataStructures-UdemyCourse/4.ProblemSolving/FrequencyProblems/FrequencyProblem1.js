// O(n^2)
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    // check same frequency of values by deleting one value or the first time we see that vlaue.
    arr2.splice(correctIndex, 1);
  }
  return true;
}

// [1,2,3,2], [9,1,4,4]

// O(n)
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  // create two object 1 for each array
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};

  // go through our first array and grab the values
  for (let val of arr1) {
    // place the values of the array as the keys of the object and track the amount of times they show up
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    //
    // place the values of the array as the keys of the object and track the amount of times they show up
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    // check if the the squared values of array 1 show up in frequency counter 2
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    // check if the value (frequency= # of times the key shows up matches in both arrays)
    // for example we should have 1 of each times for each in the following
    //same([1, 2, 3, 4], [1, 4, 9, 16])
    /*
        object
        1	 1
        2	 1
        3	 1
        4	 1
        object
        1	 1
        4	 1
        9	 1
        16 1
    */

    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}
console.log(same([1, 2, 3, 4], [1, 4, 9, 16]));

// Valid Anagrams

function validAnagram(arr1, arr2) {
  // we want to compare both arrays
  // make sure that they are anagrams or that they have the same amount of characters

  // edge case - if both lenghts do not match then call it a day

  if (arr1.length !== arr2.length) return false;

  // lets use the frequency algorithm if the frequency match of the characters then it has to be true

  // empty array
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  // force the character of the array to be lower case
  for (let value of arr1.toLowerCase()) {
    // if the value isn't in the frequency counter then make it 0 and then add  1
    frequencyCounter1[value] = (frequencyCounter1[value] || 0) + 1;
  }

  for (let value of arr2.toLowerCase()) {
    // if the value isn't in the frequency counter then make it 0 and then add  1
    frequencyCounter2[value] = (frequencyCounter2[value] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    // make sure there are only numbers and that the letters from array1 is is in array 2 else its false
    if (!/[a-z]/.test(key) || !(key in frequencyCounter2)) {
      // console.log(false)
      return false;
    }
    // make sure they show up at the same frequency or amount of time. else its false
    if (frequencyCounter1[key] !== frequencyCounter2[key]) {
      return false;
    }
  }
  return true;
}

console.log(validAnagram("", "")); // true
console.log(validAnagram("aaz", "zza")); // false
console.log(validAnagram("anagram", "nagaram")); // true
console.log(validAnagram("rat", "car")); // false) // false
console.log(validAnagram("awesome", "awesom")); // false
console.log(validAnagram("amanaplanacanalpanama", "acanalmanplanpamana")); // false
console.log(validAnagram("texttwisttime", "timetwisttext")); // true
console.log(validAnagram("qwerty", "qeywrt")); // true

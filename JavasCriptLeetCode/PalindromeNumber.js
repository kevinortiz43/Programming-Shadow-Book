/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  // we would take x and go through x like an array.
  //  ensure that up to half of the first array matches the last half of the array so up to Math.ceil(x.length)
  // if yes then return true otherwise return false
  // can javscript traverse x a whole number wiht a for loop without splitting? lets find out

  //   let numString = String(x);
  //   console.log(numString.split(""));
  //   console.log(numString.length);
  //   for (let i = 0; i < Math.ceil(numString.length); i++) {
  //     if (numString[i] !== numString[numString.length - 1 - i]) {
  //       return false;
  //     }
  //   }
  //   return true;

  let numString = String(x);
  numString.split("");
  let leftPointer = 0;
  let rightPointer = numString.length - 1;

  while (leftPointer <= rightPointer) {
    if (numString[leftPointer] !== numString[rightPointer]) {
      return false;
    } else {
      leftPointer++;
      rightPointer--;
    }
  }
  return true;
};

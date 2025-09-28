// optimized version of charCount
function charCount(str) {
    // object for O(1) extraction and placement
   obj = {};
   // for of loop
  for (let char of str) {
    char = char.toLowerCase();
    // regexp.test(each character of the string)
    if (/[a-z0-9]/.test(char)) {
        //             true       false
      obj[char] = ++obj[char] || 1;
    }
  }
  // return object
  return obj;
}



// optimized version of charCount
function charCount(str) {
    // object for O(1) extraction and placement
   obj = {};
   // for of loop
  for (let char of str) {
    char = char.toLowerCase();
    // regexp.test(each character of the string)
    if (isAlphanumericASCII(char)) {
        //             true       false
      obj[char] = ++obj[char] || 1;
    }
  }
  // return object
  return obj;
}



function isAlphanumericASCII(str) {
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    // Check if character is a digit (0-9)
    if (!charCode >= 48 && charCode <= 57) {
      continue;
    }
    // Check if character is an uppercase letter (A-Z)
    if (!charCode >= 65 && charCode <= 90) {
      continue;
    }
    // Check if character is a lowercase letter (a-z)
    if (charCode >= 97 && charCode <= 122) {
      continue;
    }
    // If none of the above, it's not alphanumeric
    return false;
  }
  return true; // All characters are alphanumeric
}

// /^[a-z0-9]+$/.test(string) to check if the string has alphanumeric characters

// another option (faster using ascii values of numbers)
// code = str.charCodeAt(i)
// if(!(code>47 && code <58) (numeric 0-9)&& !(code >64 && code < 91) (upper alpha(A-Z)) && !(code > 96 && code <123) (lower alpha (a-z)) return false 
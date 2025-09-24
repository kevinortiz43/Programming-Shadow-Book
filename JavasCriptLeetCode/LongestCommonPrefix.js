/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  // our prefix is the first word
  let prefix = strs[0];

  // our prefix length so we remember
  let prefixLength = prefix.length;

  // for loop to traverse the array and find out other words. we start at one because we want the other word
  for (let i = 1; i < strs.length; i++) {
    // we take the second word in the array
    let string = strs[i];

    // while loop, so we have the word at the 0th index === first word
    // if they don't match we just keep looking at the shorter length of the first word
    //if our prefix length is 0 then there is no common prefix
    // else also remove a bit off our base case
    // if there is a match we exit
    while (prefix !== string.substring(0, prefixLength)) {
      prefixLength--;
      if (prefixLength === 0) {
        return "";
      }
      prefix = prefix.substring(0, prefixLength);
    }
  }
  return prefix;
};

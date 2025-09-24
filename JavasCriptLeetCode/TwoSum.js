var twoSum = function (nums, target) {


  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  // new dictionary to hold our index as we are going through the nums[array]
  // if we find our combination that equals to target then we return the current index and the index of the number we found
  const pairIndex = {};
  // console.log(pairIndex);

  for (let i = 0; i < nums.length; i++) {
    // our current num is equal to nums[i]
    let num = nums[i];

    // if our target - num is inside pairIndex dictionary
    //  then return [i, dictionary[target-num]]
    if (target - num in pairIndex) {
      return [i, pairIndex[target - num]];
    }
    // pair index dictionary[of our current number]=i
    pairIndex[num] = i;
  }
};

nums = [2, 7, 11, 15];
let expected = [0, 1];
console.log(expected);
console.log(twoSum(nums));

function twoSums(nums, target) {
  let dictionary = {};
  // our dictionary to place our nums and indexes and easily
  //extract key value pairs or nums and index

  for (let index in nums) {
    let result = target - nums[index];
    //result = our target - our current number
    if (dictionary[result] !== undefined) {
      // we access our dictionary if we find
      // the result inside our dictionary then we have our pair
      // return index of the correct answer and current index
      // target =10
      // nums [1,2,3,4,5,6]
      // 10 -6 = 4
      // is 4 in our dictionary
      // return dictionary[result] = index of our result 3
      // return current index 5
      // return [3,5]
      return [dictionary[result], index];
    } else {
      // if we don't find the match in our current loop
      // then just save the key value pair in this dictionary for later use
      dictionary[nums[index]] = index;
    }
  }
  // if we don't find it at all then there's no answer and return null
  return null;
}

function maxSubarraySum(arr, num){
  let maxSum = 0;
  let tempSum = 0;
  // if array is smaller than the range it wants to check then it has to be unusable

  if (arr.length < num) return null;

  // we take up to the range so the first # of num in our array and sum it
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  // our tempsum is now our maxsum
  tempSum = maxSum;

  // this creates our sliding window
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
//                         [1 2 3] = sumOf
//                           [1 2 3] = sumOf
//                             [1 2 3] = sumOf
//                               [1 2 3] = sumOf
//                                 [1,2,3] = sumOf
//                                   [1,2,3] = sumOf
//                                     [1,2,3] = sumOf
console.log(maxSubarraySum([2,6,9,2,1,8,5,6,3],3))

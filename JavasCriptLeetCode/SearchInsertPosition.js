/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let leftPointer = 0;
    let rightPointer = nums.length - 1;

    while (leftPointer <= rightPointer) {
        let midPoint = Math.floor((leftPointer + rightPointer) / 2)

        if (nums[midPoint] === target) {
            return midPoint;
        }

        else if (nums[midPoint] > target) {
            rightPointer = midPoint - 1
        }
        else if (nums[midPoint] < target) {
            leftPointer = midPoint + 1;
        }
    };
    return leftPointer;

};

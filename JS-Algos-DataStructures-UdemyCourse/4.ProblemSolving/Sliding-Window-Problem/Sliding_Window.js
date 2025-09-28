function maxSum(arr, k) {
    const n = arr.length;
    if (n < k) {
        console.log("Invalid");
        return -1;
    }

    // Compute sum of first window of size k
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    let maxSum = windowSum;

    // Slide the window from start to end of the array
    for (let i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

// Driver Code
const arr = [5, 2, -1, 0, 3];
const k = 3;
console.log(maxSum(arr, k));
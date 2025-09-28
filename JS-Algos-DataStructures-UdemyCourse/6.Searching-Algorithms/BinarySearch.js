function binarySearch(sortedArray, value) {
  // Pointers for the search range
  let low = 0;
  let high = sortedArray.length - 1;


  if(value < sortedArray[low] || value > sortedArray[high]) return -1;

  // The loop continues as long as the search range is valid
  while (low <= high) {
    // Calculate the middle index
    let middle = Math.floor((low + high) / 2);

    // If the middle element is the value, we found it
    if (value  === sortedArray[middle]) {
      return middle;
    }
    // If the value is in the right half, update the low pointer
    else if (value > sortedArray[middle]) {
      low = middle + 1;
    }
    // If the value is in the left half, update the high pointer
    else {
      high = middle - 1;
    }
  }


}

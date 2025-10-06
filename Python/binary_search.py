def binary_search(arr, target):
    """
    Performs a binary search on a sorted array to find the target element.

    Args:
        arr: A sorted list or array of elements.
        target: The element to search for.

    Returns:
        The index of the target element if found, otherwise -1.
    """
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2  # Calculate the middle index

        # Check if the target is present at the middle
        if arr[mid] == target:
            return mid
        # If target is greater, ignore the left half
        elif arr[mid] < target:
            low = mid + 1
        # If target is smaller, ignore the right half
        else:
            high = mid - 1

    # If the loop finishes, the element was not found
    return -1

# Example usage:
sorted_list = [2, 3, 4, 10, 40]
search_target = 10
result = binary_search(sorted_list, search_target)
print(result)
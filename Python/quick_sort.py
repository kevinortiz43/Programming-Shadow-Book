def findSmallest(arr):
    smallest = arr[0]
    smallest_index = 0
    
    for i in range (1, len(arr)):
        if arr[i] < smallest:
            smallest = arr[i]
            smallest_index = i
    return smallest_index
    

array = [5,4,3,2,1,0]

print(findSmallest(array))


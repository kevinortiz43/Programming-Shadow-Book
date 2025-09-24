//  Binary Search


function binarySearch(array,value){
 
 let low = 0
 let high = array.length-1;
let myMap = new Map();
 
 if(value < array[low] || value > array[high]) return -1
 if(value === array[low]) return low
 if(value === array[high] ) return high 
 if(myMap.has(value)) return myMap.get(value)

 while(low<high){
   let middle =  Math.floor((high-low)/2)
     if(value === array[middle]){
        myMap.set(value,middle) 
        return middle
     }
     else if(value < array[middle]){
             low = low+1;
                // middl
     }
     else if(value > array[middle]){
            high = high + 1;
     }
 }
 
  // add whatever parameters you deem necessary - good luck!
}
binarySearch([1,2,3,4,5],1) 
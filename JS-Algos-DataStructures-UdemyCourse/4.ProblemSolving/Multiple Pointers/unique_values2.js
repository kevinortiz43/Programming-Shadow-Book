function countUniqueValues(array){
  // add whatever parameters you deem necessary - good luck!
  
  let left = 0;
  let right = 1;
  let counter = 0;
  if(array.length ===0) return 0; 
  
  while(array[right] !==undefined ){
      
      if(array[left] !== array[right]){
          counter++;
          }
        
        left++
        right++
        
  }
  return counter+1;
  
}
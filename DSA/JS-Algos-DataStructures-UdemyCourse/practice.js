// challenge 1: groupBy (reduce)
// Implement groupBy(arr, cb) that returns an object grouping elements by cb(el).
// Constraints: do it with reduce; keys must be strings; do not mutate input.
// Hint: reduce accumulator is the object; initialize {}.

// keys -> Math.floor(el in arr) -> cb(el) -> Math.floor(el)
// values --> els that are input into the cb

//return an object grouping elements by cb el
// { cb(el): el }

function groupBy(arr, cb) {
  return arr.reduce((acc, curr) => {
    const key = cb(curr); // 1, 2
    acc[key] = arr.filter( (el) => cb(el) === key);
    return acc;
}, {});
}

console.log(groupBy([1.3, 2.1, 2.4], Math.floor));
//  { '1': [1.3], '2': [2.1,2.4] }

// topNBy (map + reduce)
// Implement topNBy(arr, n, cb) that returns the n elements with highest cb(el) value (original elements, not keys).
// Constraints: use map/reduce for at least part of the solution (you may use sort if needed).
// Hint: use map to compute pairs [el, score], reduce to keep a top-heap-like array of size n.

// inputs: arr, n, cb
// .map to get the solution arr
// sort by highest cb(el) to lowest 
// use reduce to keep track of largest?

function topNBy(arr, n, cb) {
    const x = arr.reduce( (acc, curr) => {
        let resCb = cb(curr); // cb results 1, 5, 3 // 5, 3, 1
        acc.push(resCb)
        return acc;
    }, [])
    console.log(x.sort((a,b)=>b-a));

    let newArr=[]
    for(let i =0; i<n; i++){
        newArr.push(x[i])
    }
    let resultArr = [];

    // arr.filter( (el) => {
    //     cb(el) === newArr.
    

}




console.log(topNBy([{x:1},{x:5},{x:3}], 2, e => e.x))
// [{x:5},{x:3}]



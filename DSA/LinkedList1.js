// https://youtu.be/5aIohpYjYqM?si=OSxE23sMWmYQEuq3 

class ListNode {
    value; // some data
    next; // next node address

    constructor (value = 0, next = null) { // default values if no input
        this.value = value;
        this.next = next;
        // this.size = size;
    }
}

// recursive solution of finding all values in created linked list and putting those values into an array
const toArray1 = (listNode) => {
    if (listNode === null) {
        return [];
    }
    return [listNode.value].concat(toArray(listNode.next)); // pass in array version of instance of next node
}

//loop version of finding all values in created linked list and putting those values into an array
const toArray = (listNode) => {
    const output = [];

    let runner = listNode;

        while (runner !== null) { 
        output.push(runner.value);
        runner = runner.next;
    }
return output; 
}


//loop version to print out a representation of the array
const consoleLog = (listNode) => {
    const output = [];

    let runner = listNode;
    let counter = 1;

        while (runner !== null) { 
        // output.push(  { `node${counter}`: `${runner.value}` } );
         output.push(           {  [`Node${counter++}`] : runner.value}     ) 
        // pushing an obj literal with a template literal, plus incrementing a counter  
        // example: products.push({ id: 1, name: "Laptop", price: 1200 });
        // output.push("->");
        runner = runner.next;
    } 
listNode.size = counter - 1;    
console.log(output, listNode.size);
}

//loop version of finding the size of the linked list (similar to creating length method for our linked list)
const size = (listNode) => {

    let runner = listNode;
    let size = 0;

    if (listNode === null) {
        return size;
    }

    // for time efficiency / performance, if listNode.next is null, 
    // then this is also the tail so return 1 since only 1 node inside
    if (listNode.next === null) {
        return 1;
    }
    
    while (runner !== null) {
       size++;
       runner = runner.next;
    }
    listNode.size = size;
    return size;
}


// push method: recursive solution
const push = (list, listNode) => {
    if (list === null) { // base case
        return listNode;
    }
   
    list.next = push(list.next, listNode);

    list.size++;
    listNode.size = size;

    return list;
}

// push method: loop solution
const push1 = (list, listNode) => {

    console.log('before')
    consoleLog(list);

    let runner = list; 
    // this is how JS will know to connect 'runner' with 'list' ('list' determines starting point before traversing)
    // we have to create new variable 'runner' so we don't change original 'list'
 
    if (list === null) { // base case
        return listNode;
    }

    while (runner.next !== null){
        runner = runner.next;
        // console.log('runner', runner);
    }
    runner.next = listNode;
    list.size++;

    console.log('after')
    consoleLog(list);
    // console.log('outside loop', runner);

    return list;
}


// const push1 = (list, listNode) => {
//     console.log('before')
//     consoleLog(list);
//     // let runner = list;
 
//     if (list === null) { // base case
//         return listNode;
//     }

//     while (list.next !== null){
//         list = list.next;
//     }
//     list.next = listNode;
//     console.log('after')
//     consoleLog(list);
//     return list;
// }


// consoleLog(push(null,new ListNode(101)));




// function push (listNode, value) {
//     let runner = listNode;
//     let tail;

//     while (runner !== null) {
//        runner = runner.next;
//        tail = runner;
//     }
   
//     //  access the current node and connect it with new listNode(listnode.value,newNode)
//     // newNode = new ListNode(value,null)
//     const newNode = new ListNode(value, null)
//     tail.next = newNode;
//     return listNode;
//    } 

  // call back call to the size(functoin)
  // returns the length

  // node ${size(linkedList)+1} = new listNode(value, null)
    // let newNodeNumber = size(listNode);
    // newNodeNumber+1;
    // `node${newNodeNumber}` = new ListNode(value,null);
    
    // our size could act like a count to determine how many .next iterations we need to get to the end
    // size 3 +1
    // .next.next.next.next

// [ {node1: 4}, {node2: -5} ]


// create instances of node class for linked list in reverse order, with tail created first, head last
// const node4 = new listNode(value,node5)
const node4 = new ListNode(16, null);
const node3 = new ListNode(0, node4);
const node2 = new ListNode(-5, node3);
const node1 = new ListNode(4, node2);

// console.log("node 1 value", node1.value); // node 1 value, 4
// console.log("next node value", node1.next.value); // next node value, -5

// console.log(node1.next.next.next); // 16
// console.log(node1.next) //

// const ll = toArray(node1);

const SLL4Elements = node1; // head
const SLL3Elements = node2;
const SLL2Elements = node3;
const SLL1Element = node4;
const SLL0Element = null; // tail


// actual check
// console.log(toArray1(node1));

// base case check
// console.log(toArray1(null));

// consoleLog(node1);
// console.log(size(node1));


consoleLog(push1(node1, new ListNode(100))) // use our created function consoleLog so it is represented more clearly!!

// at end runner.next = null 
// if runner has 0 value, then falsy. since JS is built on C
// and C and C# uses 1 to denote true, 0 to denote false 
// SO base case should be !== null, NOT while (runner && runner.value) since runner.value = 0 in node3 and would be falsy 
// while runner is not equal to null then we know the runner is a list node
// undefined is a value 
// but in singly linked list null is just saying we got to out of bounds or its saying that there no list node (null is NO VALUE or absence of linked node)
// the equivalent in arrays is saying 
// arr[3]  in [0,1,2] no because arr[3] means you went out of bounds because arr[3] doesn't exist 
// if (i !== undefined)
// if (arr.length !== 0)
// if (arr[i] !== null) // basically any element that doesn't exist since out of bounds (that's what it'll say in Java)


// runner is in linkedList is a pointer (since it's running through the list)


// in Java: int array = [3]; // integer, saying 3 values in array    
// function toArray(listNode){
//     let arr = [];

//     console.log(listNode.next)
//     console.log(`first value  ${listNode.value}` )
//     // what if the listNode doesn't exist?
//     // if the list node doesn't exist then return "hey enter a list node"
//     if (listNode.value === null || listNode === undefined) {
//        return Error(`enter a list node`); 
//     }   

//     // how to traverse the singly list
//     // while loop yes 
//     // list node people would use current list.next

//     let currVal = listNode.value; // node1.next
//     let nextVal =  listNode.next.value;

//     let nextAdd = listNode.next // node 2
//     // listNode.next.next // node3
//     // listNode.next.next.next // node4


    // while( nextAdd !== null){
//             arr.push(currVal)
//             currVal = listNode.next.value
//             nextAdd = nextAdd.next;
            
//     }
//     console.log(arr);
//   return arr;
// }



// actual check
// console.log(toArray(node1));

// base case check
// console.log(toArray(null));






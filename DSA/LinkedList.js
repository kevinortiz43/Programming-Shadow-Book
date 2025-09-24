class ListNode {
    value; // some data
    next; // next node address

    constructor (value = 0, next = null) { // default values if no input
        this.value = value;
        this.next = next;
    }
}

// recursive solution
const toArray1 = (listNode) => {
    if (listNode === null) {
        return [];
    }
    return [listNode.value].concat(toArray(listNode.next)); // pass in array version of instance of next node
}

//loop version
const toArray = (listNode) => {
    const output = [];

    let runner = listNode;

        while (runner !== null) { 
        output.push(runner.value);
        runner = runner.next;
    }

return output; 
}


//loop version
const consoleLog = (listNode) => {
    const output = [];

    let runner = listNode;
    let counter = 1;

        while (runner !== null) { 
        // output.push(  { `node${counter}`: `${runner.value}` } );
         output.push(           {  [`Node${counter++}`] : runner.value}     ) // pushing an obj literal with a template literal, plus incrementing a counter  
            // products.push({ id: 1, name: "Laptop", price: 1200 });
        // output.push("->");
        runner = runner.next;
    }

    // for loop 
    // console log with string literals `output[i] ->` 
console.log(output);
}

//loop version
const size = (listNode) => {

    let runner = listNode;
    let size = 0;

    if (listNode === null) {
        return size;
    }

    // for time efficiency / performance, if listNode.next is null, then this is also the tail so return 1 since only 1 node inside
    if (listNode.next === null) {
        return 1;
    }
    
    while (runner !== null) {
       size++;
       runner = runner.next;
    }
    
    return size;
}


// push recursive solution
const push = (list, listNode) => {
    if (list === null) { // base case
        return listNode;
    }
   
    list.next = push(list.next, listNode);

    return list;
}

// push loop solution
const push1 = (list, listNode) => {
    let runner = list;
 
    if (list === null) { // base case
        return listNode;
    }
   

    while (runner.next !== null){
        runner = runner.next;
    }
    runner.next = listNode;
    return list;
}


consoleLog(push(null,new ListNode(101)));





// create instances of node class for linked list in reverse order, with tail created first, head last
// const node4 = new listNode(value,node5)
const node4 = new ListNode(16, null);
const node3 = new ListNode(0, node4);
const node2 = new ListNode(-5, node3);
const node1 = new ListNode(4, node2);

console.log("node 1 value", node1.value); // node 1 value, 4
console.log("next node value", node1.next.value); // next node value, -5

console.log(node1.next.next.next); // 16
console.log(node1.next) //

// const ll = toArray(node1);

const SLL4Elements = node1; // head
const SLL3Elements = node2;
const SLL2Elements = node3;
const SLL1Element = node4;
const SLL0Element = null; // tail


// actual check
console.log(toArray1(node1));

// base case check
console.log(toArray1(null));

consoleLog(node1);
console.log(size(node1));


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





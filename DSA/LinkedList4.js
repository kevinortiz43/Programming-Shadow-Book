// https://youtu.be/5aIohpYjYqM?si=OSxE23sMWmYQEuq3

// Construct Single Node with value and next node address / pointer
class ListNode {
  constructor(value, next = null) {
    this.value = value; // store value of this node
    this.next = next; // pointer to next node (default: null)
  }
}

// Create/Get/Remove Nodes From Linked List
class LinkedList {
  constructor() {
    this.headNode = null; // headNode = entry point of the list (initially empty)
    this.size = 0; // Size = how many nodes exist
  }

  //   ========================== functions go in here as built in linked list methods =========================================

  insertFirst(value) {
    this.headNode = new ListNode(value, this.headNode);
    this.size++;
  }

  insertLast(value) {
    let tailNode = new ListNode(value);
    let currentNode = null; // this.headNode is starting point, make new variable currentNode to not change original list

    // edge case
    if (!this.headNode) {
      // singly linked list is empty so our new node is the headNode
      this.headNode = tailNode;
    } else {
      // singly linked list is not empty then we start at the headNode
      currentNode = this.headNode;

      while (currentNode.next !== null) {
        // while we have a node next to us (to the right) we traverse. There is a path
        currentNode = currentNode.next; // This is our runner to get to tail / end of list
      }
      currentNode.next = tailNode;
    }
    this.size++;
  }

  // push method: recursive solution
  insertLast1(value) {
    let tailNode = new ListNode(value);
    let currentNode = null; // this.headNode is starting point, make new variable currentNode to not change original list

    // edge case
    if (!this.headNode) {
      // singly linked list is empty so our new node is the headNode
      this.headNode = tailNode;
    } else {
      currentNode.next = insertLast1(currentNode.next, tailNode);
    }
    this.size++;
    // alt for windows or option key for mac (to move line up or down)
  }

  insertAt(value, index) {
    // edge case
    if (index > 0 && index > this.size) {
      // if positive index number AND greater than length of linked list
      throw Error(`input valid index. List size is ${this.size}`);
    }

    // If first index // special case: insert at headNode
    if (index === 0) {
      // index 4 !== 0 so skip
      this.insertFirst(value);
      return;
    }

    const newNode = new ListNode(value); // Create node = [500] → null
    let currentNode = null;
    let previousNode = null;

    currentNode = this.headNode; // starting point Node 1
    let count = 0; // need count variable to keep track of current location in linked list

    // node 1 node 2 node 3 ^insert newNode^ node 4 node 5
    // index = 3
    // node 2

    while (count < index) {
      // ex: index = 3
      previousNode = currentNode;
      count++;
      // previous node = node 1
      // count = 1
      // current node = node 2

      //previous node = node 2
      // count 2
      // current node = node 3

      // previous node = node 3
      // count = 3
      // current node = node 4

      currentNode = currentNode.next;
      // DOES run line 101 even after incremented count = 3 since JS hasn't yet gone back to check condition at line 86
    }

    // previous node = node 3
    // count = 3
    // current node = node 4

    // is this the connection? This is where we revise the next-node addresses
    newNode.next = currentNode; // newNode.next = node4 (node4 directly to right of newNode)
    previousNode.next = newNode; // node3.next = newNode (node3 is directly to left of newNode so overwrite the node3.next address so it points to newNode, not node4)

    this.size++;
  }

  removeAt(index) {
    // edge case
    if (index > 0 && index > this.size) {
      // if positive index number AND greater than length of linked list
      throw Error(`input valid index. List size is ${this.size}`);
    }

    let currentNode = null;
    let previousNode = null;

    currentNode = this.headNode; // starting point Node 1
    let count = 0; // need count variable to keep track of current location in linked list

    // If first index // special case: insert at headNode
    if (index === 0) {
      // index 4 !== 0 so skip
      // node 1 -> node 2 -> node 3 -> node 4 -> node 5 -> null
      // node 1  x node 2 -> node 3 -> node 4 -> node 5 ->
      this.headNode = currentNode.next;
      return;
    }

    while (count < index) {
      // ex: index = 3
      previousNode = currentNode;
      count++;
      currentNode = currentNode.next;
      // previous node = node 1
      // count = 1
      // current node = node 2

      //previous node = node 2
      // count 2
      // current node = node 3

      // previous node = node 3
      // count = 3
      // current node = node 4

      // DOES run line 101 even after incremented count = 3 since JS hasn't yet gone back to check condition at line 86
    }

    // remove node 4 (index 3)
    // so we want node 3 to be node3.next = node4.next (node5)
    previousNode.next = currentNode.next; //

    this.size--;
  }

  getAt(index) {
    let currentNode = this.headNode;
    let count = 0;

    // verifyIndex
    // edge case
    if (index > 0 && index > this.size) {
      // if positive index number AND greater than length of linked list
      throw Error(`Input valid index. List size is ${this.size}`);
    }

    // If first index // special case: insert at headNode
    if (index === 0) {
      console.log(currentNode.value);
      return;
    }
    // node1 - node2 - node3 - node4 - node5
    //   0       1       2      3       4
    //     count = 0; index = 3
    // 0 < 3
    // 1 < 3
    // 2 < 3
    // 3 < 3 exit loop

    while (count < index) {
      // node1 = node1.next (node2)
      // count = 1;

      // node2 = node2.next( node3)
      // count = 2;

      // node3 = node3.next(node4)
      // count = 3;

      currentNode = currentNode.next;

      count++;
    }

    // console.log(node4)

    console.log(currentNode.value);
    return;
  }

  //loop version to print out a representation of the array
  getList() {
    let currentNode = this.headNode;
    let output = [];
    let counter = 1;

    if (this.size === 0) {
      console.log(output);
      return;
    }

    while (currentNode !== null) {
      output.push({ [`Node${counter++}`]: currentNode.value });
      currentNode = currentNode.next;
    }
    console.log(output, `list size:`, this.size);
  }

 clearList() {
    this.headNode = null;
    this.size = 0;
  }

 reverse() {
    let currentNode = this.headNode;
    let previous = null;
    let next = null;


    while (currentNode !== null) {
        next = currentNode.next; // grab node 2
        currentNode.next = previous; // point address back to previous node
        previous = currentNode; // node1
        currentNode = next // node2
    }
   this.headNode = previous // tail now becomes head
    }
}

// create instances of node class for linked list in reverse order, with tail created first, headNode last
const newList = new LinkedList();

console.log("0");
newList.getList();

console.log("1");
newList.insertFirst(100);
newList.getList();

console.log("2");
newList.insertLast(400);
newList.getList();

console.log("3");
newList.insertAt(300, 1);
newList.getList();

console.log("4");
newList.insertLast(500);
newList.getList();

console.log("5");
newList.insertAt(200, 1);
newList.getList();

console.log("6");
newList.insertAt(200, 1);
newList.getList();

console.log("7");
newList.removeAt(1);
newList.getList();

console.log("8");
newList.getAt(3);

newList.reverse();
console.log("9 - rev")
newList.getList();

newList.reverse();
console.log("10 - rev back to norm")
newList.getList();
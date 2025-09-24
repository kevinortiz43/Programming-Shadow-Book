//https://youtu.be/4FvRJ8T8Izw?si=HF1SgwLqXqGUxW1e

class ListNode {
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class DblLinkedList {
  constructor() {
    this.headNode = null;
    this.tailNode = null;
    this.size = 0;
  }

  insertFirst(value) {
    const newNode = new ListNode(value);

    if (!this.headNode) {
      // if empty list
      this.headNode = this.tailNode = newNode;
    } else {
      // if headNode already exists
      newNode.next = this.headNode; // newNode next address -> existing head
      this.headNode.prev = newNode; // newNode <- existing head prev address
      this.headNode = newNode; // reassign this.headNode to newNode
    }
    this.size++;
  }

  insertLast(value) {
    const newNode = new ListNode(value);

    if (!this.tailNode) {
      // if empty list
      this.headNode = this.tailNode = newNode;
    } else {
      this.tailNode.next = newNode; // existing tail next address -> newNode
      newNode.prev = this.tailNode; // existing tail <- newNode prev address
      this.tailNode = newNode; // reassign this.tailNode to newNode
    }
    this.size++;
  }

  insertAt(value, index) {
    if ((index > 0 && index > this.size - 1) || index < 0) {
      // if index out-of-bounds or negative
      throw Error(`input valid index. List size is ${this.size}`);
    }

    if (index === 0) {
      // if index 0, invoke insertFirst()
      this.insertFirst(value);
      return;
    }

    const newNode = new ListNode(value);
    let currentNode = null; // currentNode pointer
    let prevNode = null; // prevNode pointer for traversing forward
    let nextNode = null; // nextNode pointer for traversing backward
    let count = null; // count variable to keep track of current location

    let disToTail = this.size - index; // distance btwn index and tail
    //index itself can be distance btwn head and index

    if (index <= disToTail) {
      // if index closer to head
      currentNode = this.headNode; // traverse forwards from head
      count = 0;

      while (count < index) {
        prevNode = currentNode; // save current location as prevNode
        count++;
        currentNode = currentNode.next; // currentNode moves 1 node forward (right)
      }
      
      // prevNode -><- inserted newNode -><- currentNode

      newNode.next = currentNode; // newNode next address -> currentNode
      prevNode.next = newNode; // prevNode next address -> newNode
      currentNode.prev = newNode; // newNode <- currentNode prev address
      newNode.prev = prevNode; // prevNode <- newNode prev address

    } else {  // if index closer to tail
      currentNode = this.tailNode; // traverse backwards from tail
      count = this.size;

      while (count > index) {
        nextNode = currentNode; // save current location as nextNode
        count--;
        currentNode = currentNode.prev; // move 1 node backwards (left)
      }
      
      // currentNode -><- inserted newNode -><- nextNode

      newNode.next = nextNode; // newNode next address -> nextNode
      currentNode.next = newNode; // currentNode next address -> newNode
      newNode.prev = currentNode; // currentNode <- newNode prev address
      nextNode.prev = newNode; // newNode <- nextNode prev address
    }

    this.size++;
  }

  removeAt(index) {
    if ((index > this.size - 1) || index < 0) {
      throw Error(`input valid index. List size is ${this.size}`);
    }

    let currentNode = null; // currentNode pointer

    // If first index, remove head
    // if (index === 0) {
    //   currentNode = this.headNode; // currentNode points to head
    //   this.headNode = currentNode.next; // next node becomes new head
    //   // if only 1 node, then this.headnode = null

    //   if (this.headNode !== null) { // if at least 2 nodes in orig list
    //     this.headNode.prev = null; // detach the old head
    //   } else { // if this.headNode IS null (meaning there was only 1 node in orig list)
    //     this.tailNode = null; // list is empty
    //   }
    //   this.size--;
    //   return;
    // }


      if(index ===0 && this.size ===1){
      this.headNode = null;
      this.tailNode = null; // list is empty
      this.size--;
      return;
    }


        // If first index, remove head
    if (index === 0 && this.size >1 ) {
      currentNode = this.headNode; // currentNode points to head
      this.headNode = currentNode.next; // next node becomes new head
      this.headNode.prev = null; // detach the old head
      // if only 1 node, then this.headnode = null
      this.size--;
      return;
    }
    

    // if index is at tail, remove tail
    /*
    (100) <-> (200) <-> (300) <-> (400) <-> (500) <-> (600) 
                                                        cn
    
    (100) <-> (200) <-> (300) <-> (400) <-> (500) <-> (600) 
                                              ntl              

    n = 6;
    indexLast 5;
    */
    
    if (index === this.size - 1) {  // assumes that at least 2 nodes in the orig list since we would've already encountered the option of only 1 node in orig list when removing at index 0 
      currentNode = this.tailNode; // currentNode points to tail
      this.tailNode = currentNode.prev; // prev node becomes new tail 
      this.tailNode.next = null; // new tail node.next = null (which is just previous node becomes null )
      // detach old tail 
      this.size--;
      return;
    }    

    let prevNode = null; // prevNode pointer for traversing forward
    let nextNode = null; // nextNode pointer for traversing backward
    let count = null; // count variable to keep track of current location

    let disToTail = this.size - index; // distance btwn index and tail
    //index itself can be distance btwn head and index

    if (index <= disToTail) {
      // if index closer to head
      currentNode = this.headNode; // traverse forwards from head
      count = 0;

      while (count < index) {
        prevNode = currentNode; // save current location as prevNode
        count++; 
        currentNode = currentNode.next; // move 1 node forward (right)
        nextNode = currentNode.next // save nextNode as 1 node right of currentNode
      }
    // prevNode -><- currentNode (to remove) -><- nextNode
    } else {
        currentNode = this.tailNode; // traverse backwards from tail
        count = this.size;

        while (count > index) {
            nextNode = currentNode; // save current location as nextNode
            count--;
            currentNode = currentNode.prev; // move 1 node backwards (left)
            prevNode = currentNode.prev; // save prevNode as 1 node left of curentNode
        }
    // prevNode -><- currentNode (to remove) -><- nextNode
    
    }
    prevNode.next = nextNode; // reassign prevNode next address -> nextNode
    nextNode.prev = prevNode; // reassign prevNode <- nextNode prev address

    this.size--;
  }

  getAt(index) {
    let currentNode = this.headNode;
    let count = 0;

    // verifyIndex
    // edge case
    if ((index > 0 && index > this.size - 1) || index < 0) {
      throw Error(`Input valid index. List size is ${this.size}`);
    }

    // If first index // special case: insert at headNode
    if (index === 0) {
      console.log(currentNode.value);
      return;
    }

    while (count < index) {
      currentNode = currentNode.next;
      count++;
    }

    console.log(currentNode.value);
    return;
  }

  //loop version to print out a representation of the array
  getList() {
    let currentNode = this.headNode;
    let output = [];
    let counter = 1;

    if (this.size === 0) {
      console.log(output, `list size: ${this.size}`);
      return;
    }

    while (currentNode !== null) {
      output.push({ [`Node${counter++}`]: currentNode.value });
      currentNode = currentNode.next;
    }
    console.log(output, `list size: ${this.size}`);
  }

  clearList() {
    this.headNode = null;
    this.size = 0;
  }
}

// create instances of node class for linked list in reverse order, with tail created first, headNode last
const newList = new DblLinkedList();

console.log("1");
newList.insertFirst(100);
newList.getList();

console.log("1a");
newList.removeAt(0);
newList.getList();

// console.log("1b");
// newList.insertFirst(100);
// newList.getList();

// console.log("2");
// newList.insertLast(300);
// newList.getList();

// console.log("3");
// newList.insertAt(200, 1);
// newList.getList();

// console.log("4");
// newList.insertLast(600);
// newList.getList();

// console.log("5");
// newList.insertAt(400, 3);
// newList.getList();

// console.log("6");
// newList.insertAt(500, 4);
// newList.getList();

// console.log("7");
// newList.removeAt(5); // tail remove
// newList.getList();

// console.log("8");
// newList.removeAt(2);
// newList.getList();

// console.log("9");
// newList.insertAt(50, 0); // head insert
// newList.getList();

// console.log("10");
// newList.removeAt(0); // head remove
// newList.getList();


// console.log("11");
// newList.getAt(3);


// console.log("9");
// newList.insertAt(300, 2);
// newList.getList();

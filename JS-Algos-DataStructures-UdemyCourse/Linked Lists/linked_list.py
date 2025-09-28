class Node:
    
    """
    An object for storinga single node of a linked list. 
    models two attributes - data nad the link to the next node in the list
    """        
    def __init__(self, data, next_node = None): #constructor function
        self.data = data
        self.next_node = next_node

    def __repr__(self): # this is automatically called by functions like repr()
        # 
        return "<Node data: %s>" % self.data # "<%s>" refers to str placeholder (output formatted as a string). Whereas self.data is the input data passing into %s 
    
        #Linear data structure that stores values in nodes. The list maintains a ref to 1st node, also called head. Each node points to the next node in the list
        # Attributes: head: The head node of the list

class SinglyLinkedList:
    
    def __init__(self):
        self.head = None
        # Maintaining a count attribute allows for len() to be implemented in
        # constant time
        self.__count = 0 # __count is name mangling and 'private' attribute (inteded for internal use inside class, so NOT modified from outside class)

        # Determines if the linked list is empty
        # Takes O(1) time
        
    def is_empty(self): 
        return self.head is None #evaluates to true / false

    def __len__(self):

        return self.__count 
 
        # Returns the length of the linked list
        # Takes O(1) time

    def add(self, data):
        
         # Adds new Node containing data to head of the list
         # Also called prepend
         # Takes O(1) time
         
        #  100 -> none
        #  l.add(200)
        #  200 -> 100 -> none
        new_head = Node(data, next_node=self.head) # instantiate a Node class object, and next_node points to previous self.head (if this previous head already exists, which would be to the right of the newly added node)
        self.head = new_head # self.head is now reassigned to the newly created node (which becomes the new head)
        self.__count += 1

    def search(self, data):
         # Search for the first node containing data that matches the data
         # Returns the node or `None` if not found
         # Takes O(n) time
       
       
        current = self.head

        while current: # same as while current != none
            if current.data == data: 
                return current
            else:
                current = current.next_node
        return None

    def insert(self, data, index):
         # Inserts a new Node containing data at index position
         # Insertion takes O(1) time but finding node at insertion point takes
         # O(n) time.
         # Takes overall O(n) time.
        
        if index >= self.__count:
            raise IndexError('index out of range')

        if index == 0:
            self.add(data) # invoke add method
            return

        if index > 0:
            new = Node(data) # instantiate a Node class object
            position = index
            current = self.head

            while position > 1:
                current = current.next_node
                position -= 1
       
            # in our while loop
                # traverse until our position = 0
                # keep going right 
                # ill decrease the position number 

                # [1] -> [2] -> [3] -> [4] ->[5]
                #  0      1      2      3     4 
                # insert at index 4 or position 4

                # [1] -> [2] -> [3] -> [4] -> [5]
                #  0      1      2      3      4 
                #         c                    p    originally when initialized
                #                c      p           first pass
                #                p      c           second pass
                #        p                     c    third (pass our while loop breaks)
                
            prev_node = current
            next_node = current.next_node

            prev_node.next_node = new
            new.next_node = next_node

        self.__count += 1

    def node_at_index(self, index):
         # Returns the Node at specified index
         # Takes O(n) time
        
        if index >= self.__count:
            raise IndexError('index out of range')

        if index == 0:
            return self.head

        current = self.head
        position = 0

        while position < index:
            current = current.next_node
            position += 1

        return current

    def remove(self, key):
       # Removes Node containing data that matches the key
       # Returns the node or `None` if key doesn't exist
       # Takes O(n) time
       
        current = self.head
        previous = None
        found = False

        while current and not found:
            if current.data == key and current is self.head:
                found = True
                self.head = current.next_node
                self.__count -= 1
                return current
            elif current.data == key:
                found = True
                previous.next_node = current.next_node
                self.__count -= 1
                return current
            else:
                previous = current
                current = current.next_node

        return None

    def remove_at_index(self, index):
       # Removes Node at specified index
       # Takes O(n) time

        if index >= self.__count:
            raise IndexError('index out of range')

        current = self.head

        if index == 0:
            self.head = current.next_node
            self.__count -= 1
            return current

        position = index

        while position > 1:
            current = current.next_node
            position -= 1

        prev_node = current
        current = current.next_node
        next_node = current.next_node

        prev_node.next_node = next_node
        self.__count -= 1

        return current


    def __iter__(self):
        current = self.head

        while current:
            yield current
            current = current.next_node


    def __repr__(self):
       # Return a string representation of the list for printing out linked list.
       #  Takes O(n) time.
      
        nodes = []
        current = self.head
        while current:
            if current is self.head:
                nodes.append("[Head: %s]" % current.data) # str version of current.data will be where "<%s>" placeholder is
            elif current.next_node is None:
                nodes.append("[Tail: %s]" % current.data)
            else:
                nodes.append("[%s]" % current.data) 
            current = current.next_node
        return  '-> '.join(nodes)


l = SinglyLinkedList()

l.add(500)
l.add(400)
l.add(200)
l.insert(300, 1)
l.add(100)
l.add(100)
print(l.node_at_index(1))
print(repr(l))
# l.remove(100)
l.remove_at_index(0)
print(repr(l))

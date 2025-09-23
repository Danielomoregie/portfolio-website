# Linked List Implementation

A comprehensive implementation of a singly linked list in Python with all common operations, including insertion, deletion, searching, and traversal.

## 🎯 Learning Objectives

- Understand the concept of dynamic data structures
- Learn pointer manipulation and memory management
- Implement common linked list operations
- Analyze time and space complexity
- Practice object-oriented programming principles

## 📚 What is a Linked List?

A linked list is a linear data structure where elements are stored in nodes, and each node contains a data field and a reference (link) to the next node in the sequence. Unlike arrays, linked lists don't store elements in contiguous memory locations.

### Advantages:
- Dynamic size (can grow/shrink during runtime)
- Efficient insertion and deletion at any position
- No memory waste (allocates memory as needed)

### Disadvantages:
- No random access (must traverse from head)
- Extra memory overhead for storing pointers
- Not cache-friendly (nodes may not be contiguous)

## 🏗️ Implementation

### Node Class
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
```

### LinkedList Class
```python
class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
```

## 🚀 Features Implemented

### Basic Operations
- ✅ **Insertion**: Add elements at beginning, end, or specific position
- ✅ **Deletion**: Remove elements by value or position
- ✅ **Search**: Find elements and return their position
- ✅ **Traversal**: Display all elements in the list
- ✅ **Size**: Get the number of elements
- ✅ **Empty Check**: Check if the list is empty

### Advanced Operations
- ✅ **Reverse**: Reverse the entire linked list
- ✅ **Sort**: Sort the linked list (bubble sort implementation)
- ✅ **Remove Duplicates**: Remove duplicate elements
- ✅ **Merge**: Merge two sorted linked lists
- ✅ **Find Middle**: Find the middle element
- ✅ **Detect Loop**: Detect if there's a cycle in the list

## 🛠️ Usage

### Installation
```bash
# Clone the repository
git clone https://github.com/Danielomoregie/learning-projects.git
cd learning-projects/python/data-structures/linked-list

# Run the implementation
python linked_list.py
```

### Basic Usage
```python
from linked_list import LinkedList

# Create a new linked list
ll = LinkedList()

# Insert elements
ll.insert_at_beginning(10)
ll.insert_at_end(20)
ll.insert_at_position(15, 1)

# Display the list
ll.display()  # Output: 10 -> 15 -> 20 -> None

# Search for an element
position = ll.search(15)  # Returns: 1

# Delete an element
ll.delete_by_value(15)

# Get the size
print(ll.get_size())  # Output: 2
```

### Advanced Usage
```python
# Reverse the list
ll.reverse()
ll.display()  # Output: 20 -> 10 -> None

# Sort the list
ll.insert_at_end(5)
ll.insert_at_end(25)
ll.sort()
ll.display()  # Output: 5 -> 10 -> 20 -> 25 -> None

# Remove duplicates
ll.insert_at_end(10)  # Adding duplicate
ll.remove_duplicates()
ll.display()  # Output: 5 -> 10 -> 20 -> 25 -> None
```

## ⏱️ Time Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Insertion at beginning | O(1) | O(1) |
| Insertion at end | O(n) | O(1) |
| Insertion at position | O(n) | O(1) |
| Deletion by value | O(n) | O(1) |
| Deletion by position | O(n) | O(1) |
| Search | O(n) | O(1) |
| Traversal | O(n) | O(1) |
| Reverse | O(n) | O(1) |
| Sort | O(n²) | O(1) |

## 🧪 Testing

The implementation includes comprehensive tests:

```bash
# Run all tests
python test_linked_list.py

# Run specific test
python -m pytest test_linked_list.py::TestLinkedList::test_insertion
```

### Test Coverage
- ✅ Insertion operations (beginning, end, position)
- ✅ Deletion operations (by value, by position)
- ✅ Search functionality
- ✅ Edge cases (empty list, single element)
- ✅ Error handling (invalid positions)
- ✅ Advanced operations (reverse, sort, merge)

## 🎓 Key Learning Points

### 1. Memory Management
```python
# Creating a new node
new_node = Node(data)
new_node.next = current_node.next
current_node.next = new_node
```

### 2. Pointer Manipulation
```python
# Moving through the list
current = self.head
while current.next is not None:
    current = current.next
```

### 3. Edge Case Handling
```python
# Check if list is empty
if self.head is None:
    return "List is empty"
```

### 4. Error Handling
```python
# Validate position
if position < 0 or position > self.size:
    raise IndexError("Position out of range")
```

## 🔧 Customization

### Adding New Operations
```python
def find_maximum(self):
    """Find the maximum value in the linked list."""
    if self.head is None:
        return None
    
    current = self.head
    maximum = current.data
    
    while current:
        if current.data > maximum:
            maximum = current.data
        current = current.next
    
    return maximum
```

### Modifying for Doubly Linked List
```python
class DoublyNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None
```

## 🚀 Future Improvements

- [ ] Implement doubly linked list
- [ ] Add circular linked list support
- [ ] Implement iterator protocol
- [ ] Add more sorting algorithms (merge sort, quick sort)
- [ ] Implement thread-safe operations
- [ ] Add serialization/deserialization
- [ ] Create visualization tools

## 📚 Related Concepts

- **Arrays vs Linked Lists**: When to use each
- **Stacks and Queues**: Can be implemented using linked lists
- **Hash Tables**: Often use linked lists for collision resolution
- **Graphs**: Adjacency lists can be implemented as linked lists
- **Trees**: Binary trees use similar node structures

## 🤝 Contributing

Feel free to contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Write tests for new functionality
5. Submit a pull request

## 📞 Contact

- **Email**: omoregiebusiness@gmail.com
- **LinkedIn**: [linkedin.com/in/omoregiedaniel](https://www.linkedin.com/in/omoregiedaniel/)
- **GitHub**: [@Danielomoregie](https://github.com/Danielomoregie)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../../LICENSE) file for details.

---

**"Data structures are the building blocks of efficient algorithms."** - Daniel Omoregie

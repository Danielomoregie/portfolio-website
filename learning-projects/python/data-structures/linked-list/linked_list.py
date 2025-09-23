"""
Linked List Implementation in Python

A comprehensive implementation of a singly linked list with all common operations.
This implementation demonstrates object-oriented programming principles and
data structure concepts.

Author: Daniel Omoregie
Date: 2024
"""


class Node:
    """
    A node in the linked list.
    
    Attributes:
        data: The data stored in the node
        next: Reference to the next node in the list
    """
    
    def __init__(self, data):
        """
        Initialize a new node.
        
        Args:
            data: The data to store in the node
        """
        self.data = data
        self.next = None
    
    def __repr__(self):
        """String representation of the node."""
        return f"Node({self.data})"


class LinkedList:
    """
    A singly linked list implementation.
    
    This class provides methods for common linked list operations including
    insertion, deletion, searching, and traversal.
    """
    
    def __init__(self):
        """
        Initialize an empty linked list.
        
        Attributes:
            head: Reference to the first node in the list
            size: Number of nodes in the list
        """
        self.head = None
        self.size = 0
    
    def is_empty(self):
        """
        Check if the linked list is empty.
        
        Returns:
            bool: True if the list is empty, False otherwise
        """
        return self.head is None
    
    def get_size(self):
        """
        Get the number of nodes in the linked list.
        
        Returns:
            int: The size of the linked list
        """
        return self.size
    
    def insert_at_beginning(self, data):
        """
        Insert a new node at the beginning of the linked list.
        
        Time Complexity: O(1)
        Space Complexity: O(1)
        
        Args:
            data: The data to insert
        """
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def insert_at_end(self, data):
        """
        Insert a new node at the end of the linked list.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        
        Args:
            data: The data to insert
        """
        new_node = Node(data)
        
        if self.is_empty():
            self.head = new_node
        else:
            current = self.head
            while current.next is not None:
                current = current.next
            current.next = new_node
        
        self.size += 1
    
    def insert_at_position(self, data, position):
        """
        Insert a new node at a specific position in the linked list.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        
        Args:
            data: The data to insert
            position: The position where to insert (0-indexed)
            
        Raises:
            IndexError: If position is out of range
        """
        if position < 0 or position > self.size:
            raise IndexError("Position out of range")
        
        if position == 0:
            self.insert_at_beginning(data)
            return
        
        new_node = Node(data)
        current = self.head
        
        # Move to the position before the insertion point
        for _ in range(position - 1):
            current = current.next
        
        new_node.next = current.next
        current.next = new_node
        self.size += 1
    
    def delete_by_value(self, data):
        """
        Delete the first occurrence of a node with the given data.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        
        Args:
            data: The data to delete
            
        Returns:
            bool: True if the node was deleted, False if not found
        """
        if self.is_empty():
            return False
        
        # If the node to delete is the head
        if self.head.data == data:
            self.head = self.head.next
            self.size -= 1
            return True
        
        current = self.head
        while current.next is not None:
            if current.next.data == data:
                current.next = current.next.next
                self.size -= 1
                return True
            current = current.next
        
        return False
    
    def delete_by_position(self, position):
        """
        Delete a node at a specific position.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        
        Args:
            position: The position of the node to delete (0-indexed)
            
        Returns:
            The data of the deleted node
            
        Raises:
            IndexError: If position is out of range
        """
        if position < 0 or position >= self.size:
            raise IndexError("Position out of range")
        
        if position == 0:
            data = self.head.data
            self.head = self.head.next
            self.size -= 1
            return data
        
        current = self.head
        for _ in range(position - 1):
            current = current.next
        
        data = current.next.data
        current.next = current.next.next
        self.size -= 1
        return data
    
    def search(self, data):
        """
        Search for a node with the given data.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        
        Args:
            data: The data to search for
            
        Returns:
            int: The position of the node (0-indexed), -1 if not found
        """
        current = self.head
        position = 0
        
        while current is not None:
            if current.data == data:
                return position
            current = current.next
            position += 1
        
        return -1
    
    def get_element_at_position(self, position):
        """
        Get the data at a specific position.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        
        Args:
            position: The position to get data from (0-indexed)
            
        Returns:
            The data at the specified position
            
        Raises:
            IndexError: If position is out of range
        """
        if position < 0 or position >= self.size:
            raise IndexError("Position out of range")
        
        current = self.head
        for _ in range(position):
            current = current.next
        
        return current.data
    
    def display(self):
        """
        Display all elements in the linked list.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if self.is_empty():
            print("List is empty")
            return
        
        elements = []
        current = self.head
        
        while current is not None:
            elements.append(str(current.data))
            current = current.next
        
        print(" -> ".join(elements) + " -> None")
    
    def reverse(self):
        """
        Reverse the linked list in place.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if self.is_empty() or self.head.next is None:
            return
        
        previous = None
        current = self.head
        
        while current is not None:
            next_node = current.next
            current.next = previous
            previous = current
            current = next_node
        
        self.head = previous
    
    def sort(self):
        """
        Sort the linked list using bubble sort.
        
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        if self.is_empty() or self.head.next is None:
            return
        
        swapped = True
        while swapped:
            swapped = False
            current = self.head
            
            while current.next is not None:
                if current.data > current.next.data:
                    # Swap data
                    current.data, current.next.data = current.next.data, current.data
                    swapped = True
                current = current.next
    
    def remove_duplicates(self):
        """
        Remove duplicate elements from the linked list.
        
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        if self.is_empty() or self.head.next is None:
            return
        
        current = self.head
        while current is not None and current.next is not None:
            if current.data == current.next.data:
                current.next = current.next.next
                self.size -= 1
            else:
                current = current.next
    
    def find_middle(self):
        """
        Find the middle element of the linked list.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        
        Returns:
            The data of the middle element, None if list is empty
        """
        if self.is_empty():
            return None
        
        slow = self.head
        fast = self.head
        
        while fast is not None and fast.next is not None:
            slow = slow.next
            fast = fast.next.next
        
        return slow.data
    
    def detect_loop(self):
        """
        Detect if there's a loop in the linked list using Floyd's algorithm.
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        
        Returns:
            bool: True if loop is detected, False otherwise
        """
        if self.is_empty() or self.head.next is None:
            return False
        
        slow = self.head
        fast = self.head
        
        while fast is not None and fast.next is not None:
            slow = slow.next
            fast = fast.next.next
            
            if slow == fast:
                return True
        
        return False
    
    def to_list(self):
        """
        Convert the linked list to a Python list.
        
        Time Complexity: O(n)
        Space Complexity: O(n)
        
        Returns:
            list: A list containing all elements
        """
        result = []
        current = self.head
        
        while current is not None:
            result.append(current.data)
            current = current.next
        
        return result
    
    def __len__(self):
        """Return the size of the linked list."""
        return self.size
    
    def __str__(self):
        """String representation of the linked list."""
        if self.is_empty():
            return "LinkedList([])"
        
        elements = self.to_list()
        return f"LinkedList({elements})"
    
    def __repr__(self):
        """Detailed string representation of the linked list."""
        return self.__str__()


def merge_sorted_lists(list1, list2):
    """
    Merge two sorted linked lists into one sorted list.
    
    Time Complexity: O(n + m) where n and m are the sizes of the lists
    Space Complexity: O(1)
    
    Args:
        list1: First sorted linked list
        list2: Second sorted linked list
        
    Returns:
        LinkedList: A new merged sorted linked list
    """
    merged_list = LinkedList()
    current1 = list1.head
    current2 = list2.head
    
    while current1 is not None and current2 is not None:
        if current1.data <= current2.data:
            merged_list.insert_at_end(current1.data)
            current1 = current1.next
        else:
            merged_list.insert_at_end(current2.data)
            current2 = current2.next
    
    # Add remaining elements from list1
    while current1 is not None:
        merged_list.insert_at_end(current1.data)
        current1 = current1.next
    
    # Add remaining elements from list2
    while current2 is not None:
        merged_list.insert_at_end(current2.data)
        current2 = current2.next
    
    return merged_list


def main():
    """
    Demonstration of the linked list implementation.
    """
    print("Linked List Implementation Demo")
    print("=" * 40)
    
    # Create a new linked list
    ll = LinkedList()
    
    # Insert elements
    print("\n1. Inserting elements...")
    ll.insert_at_end(10)
    ll.insert_at_end(20)
    ll.insert_at_end(30)
    ll.insert_at_beginning(5)
    ll.insert_at_position(15, 2)
    
    print("List after insertions:")
    ll.display()
    print(f"Size: {ll.get_size()}")
    
    # Search for elements
    print("\n2. Searching for elements...")
    print(f"Search for 20: Position {ll.search(20)}")
    print(f"Search for 25: Position {ll.search(25)}")
    
    # Delete elements
    print("\n3. Deleting elements...")
    ll.delete_by_value(20)
    print("After deleting 20:")
    ll.display()
    
    # Reverse the list
    print("\n4. Reversing the list...")
    ll.reverse()
    print("After reversing:")
    ll.display()
    
    # Sort the list
    print("\n5. Sorting the list...")
    ll.insert_at_end(1)
    ll.insert_at_end(100)
    print("Before sorting:")
    ll.display()
    ll.sort()
    print("After sorting:")
    ll.display()
    
    # Find middle element
    print("\n6. Finding middle element...")
    print(f"Middle element: {ll.find_middle()}")
    
    # Convert to list
    print("\n7. Converting to Python list...")
    print(f"As list: {ll.to_list()}")
    
    # Merge two sorted lists
    print("\n8. Merging two sorted lists...")
    list1 = LinkedList()
    list1.insert_at_end(1)
    list1.insert_at_end(3)
    list1.insert_at_end(5)
    
    list2 = LinkedList()
    list2.insert_at_end(2)
    list2.insert_at_end(4)
    list2.insert_at_end(6)
    
    print("List 1:")
    list1.display()
    print("List 2:")
    list2.display()
    
    merged = merge_sorted_lists(list1, list2)
    print("Merged list:")
    merged.display()


if __name__ == "__main__":
    main()

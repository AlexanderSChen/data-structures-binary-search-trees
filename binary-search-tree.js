class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // if tree is empty, insert at root.
    if(this.root === null) {
      this.root = new Node(val);
      return this;
    }
    // otherwise find correct spot for new node.
    var current = this.root;
    // while loop will run infinitely until broken by a return.
    while(true) {
      // if val less than current val if null place val in the left node 
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          // returns entire binary tree
          return this;
          // else assign current to left node and continue traversing
        } else {
          current = current.left;
        }
        // if val greater than current val and node is null, val is inserted here.
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          // returns entire tree
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    // if tree is empty insert at root
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    // instead of while loop use recursive function to traverse through the binary tree.
    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if(current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    let found = false;

    // if val is root, return root.
    if (val === currentNode.val) return currentNode;

    // while currentNode is not null and found is false continue looping.
    while (currentNode && !found) {
      // if val is less than current val traverse left
      if (val < currentNode.val) {
        currentNode = currentNode.left;
        // if val greater than current val traverse right
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
        // if val === currentNode.val set found = true;
      } else {
        found = true;
      }
    }

    // if found is false return undefined, otherwise return currentNode.
    if (!found) return undefined;
    return currentNode;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    // check root if null return undefined
    if (this.root === null) return undefined;

    // check if val less than current val traverse left
    if (val < current.val) {
      // if left is empty return undefined otherwise continue traversing left
      if (current.left === null) return undefined;
      return this.findRecursively(val, current.left);
      // if greater than traverse right 
    } else if (val > current.val) {
      // if right node null means node we are searching for is not in the tree, return undefined
      if (current.right === null) return undefined;
      // otherwise continue traversing right side of current node.
      return this.findRecursively(val, current.right);
    } 
    // if val === current.val return current node.
    return current;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    // initialize data array
    let data = [];
    // set current to be root
    let current = this.root;

    // create traverse function passing in a node
    function traverse(node) {
      // push current node.val into array to mark a visited node.
      data.push(node.val);
      // go left if left is not null
      node.left && traverse(node.left);
      // go right if right is not null
      node.right && traverse(node.right);
    }

    // call traverse on root node and return array with visited nodes.
    traverse(current);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left);
      // by traversing left and then pushing values into the array we search the bottom of the left side of the tree and then the right side. 
      data.push(node.val);
      node.right && traverse(node.right);
    }

    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      // post order depth first search right to left --> bottom to top
      data.push(node.val);
    }
    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);

    // while queue has values in it continue looping
    while(queue.length) {
      // remove first value of queue and assign it to node
      node = queue.shift();
      // push value of node into data
      data.push(node.val);
      // if theres a value in left node push into queue
      if(node.left) {
        queue.push(node.left);
      }
      // if value in right node push into queue
      if(node.right) {
        queue.push(node.right);
      }
      // repeat 
    }
    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    // while value of nodeToRemove is not equal to val continue looping
    while(nodeToRemove.val !== val) {
      // set parent equal to nodeToRemove
      parent = nodeToRemove;
      // if val is less than nodeToRemove.val traverse left otherwise traverse right
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }
    // if nodeToRemove is not the root node
    if(nodeToRemove !== this.root) {
      // if nodeToRemove left is empty and right is empty
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        // if the left parent is the node we want to remove then set it to null otherwise set right of parent to null.
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        // if left and right are not null 
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        // search right side first and set rightParent to be the nodeToRemove and let right be the right child of the rightParent.
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        // if left of right is empty set left grandchild to be nodeToRemove.left
        if (right.left === null) {
          right.left = nodeToRemove.left;
          // if parent.left is equal to nodeToRemove set left equal to right, thus rearranging the tree and removing the node we want.
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
            // otherwise if there are more values to check continue traversing down the right side of the binary tree
          }
          } else {
            while(right.left !== null) {
              rightParent = right;
              right = right.left;
            }
            // if we found the nodeToRemove set left.val equal to right.val, which rearranges the tree and removes the node.
            if (parent.left === nodeToRemove) {
              parent.left.val = right.val;
            } else {
              // otherwise set parent.right.val = right.val and continue looping
              parent.right.val = right.val;
            }
            // if right.right has values set rightParent.left to be right.righ and continue traversing. 
            if (right.right !== null) {
              rightParent.left = right.right;
            } else {
              // otherwise set rightParent.left to be null and stop here.
              rightParent.left = null;
            }
          }
        } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current = this.root) {
    // if no root, return
    if (current === null) return;
    // returns true if maxDepth(current) is equal to minDepth(current), if maxDepth is greater than minDepth returns false. Impossible for maxDepth to be less than minDepth.
    return maxDepth(current) - minDepth(current) <= 1;

    function minDepth(current) {
      // if current is null return 0
      if (current === null) return 0;
      // return 1 + Math.min(recursive call on left and right nodes)
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }

    function maxDepth(current) {
      // return Math.max depth
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {
    // if tree is too small, return
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while(current) {
      // current is largest and has a left subtree and 2nd largest is the largest in that subtree
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }
      // current is parent of largest and largest has no children so current is 2nd largest
      if (current.right && (!current.right.left && !current.right.right)) {
        return current.val;
      }
      // if 2 cases above are not true, current is updated to be its right child and the loop continues.
      current = current.right
    }
  }

  dfsInOrderIterative() {
    let cur = this.root;
    let stack = [];
    let dfs = [];
    // while there are values in stack or there is a root continue looping
    while(stack.length > 0 || cur) {
      // while cur is not null continue looping
      while(cur) {
        // push current node into stack
        stack.push(cur);
        // set cur to left node, if no node set cur to null and exit loop.
        cur = cur.left;
      }
      // set cur = last value in stack
      cur = stack.pop();
      // if cur is not null push cur.val into dfs and traverse to the right.
      if (cur) {
        dfs.push(cur.val);
        cur = cur.right;
      }
    }
    // return array full of traversed values.
    return dfs;
  }
}

module.exports = BinarySearchTree;

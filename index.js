class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arrayTree = []) {
    this.root = this.buildTree(arrayTree);
  }

  buildTree(arrayTree) {
    if (!arrayTree.length) return null;
    const duplicatesRemovedArray = [...new Set(arrayTree)];
    let sortedArray = this.mergeSort(duplicatesRemovedArray);
    return this.constructTree(sortedArray);
  }

  constructTree(arrayTree) {
    if (!arrayTree.length) {
      return null;
    }
    let mid = Math.floor(arrayTree.length / 2);
    let left = arrayTree.slice(0, mid);
    let right = arrayTree.slice(mid + 1);
    let node = new Node(arrayTree[mid]);
    node.left = this.constructTree(left);
    node.right = this.constructTree(right);
    return node;
  }

  mergeSort(arrayTree) {
    if (arrayTree.length <= 1) return arrayTree;
    let mid = Math.floor(arrayTree.length / 2);
    let left = arrayTree.slice(0, mid);
    let right = arrayTree.slice(mid);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  merge(left, right) {
    const arrayMerged = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        arrayMerged.push(left.shift());
      } else {
        arrayMerged.push(right.shift());
      }
    }
    return arrayMerged.concat(left).concat(right);
  }

  insert(data) {
    this.root = this.insertNode(this.root, data);
    return this.root;
  }

  insertNode(root, data) {
    if (root == null) {
      root = new Node(data);
      return root;
    }

    if (root.data > data) {
      root.left = this.insertNode(root.left, data);
    } else if (root.data < data) {
      root.right = this.insertNode(root.right, data);
    }

    return root;
  }

  deletee(data) {
    this.root = this.deleteNode(this.root, data);
    return this.root;
  }

  deleteNode(root, data) {
    if (root === null) return null;

    if (root.data > data) {
      root.left = this.deleteNode(root.left, data);
    } else if (root.data < data) {
      root.right = this.deleteNode(root.right, data);
    } else {
      if (root.left === null && root.right === null) {
        root = null;
      } else if (root.left === null && root.right) {
        root = root.right;
      } else if (root.left && root.right === null) {
        root = root.left;
      } else {
        const succesor = this.findDelete(root);
        succesor.left = root.left;
        root = succesor;
      }
    }
    return root;
  }

  findDelete(root) {
    if (!root.right) return root;
    return this.findDelete(root.right);
  }

  find(value) {
    return this.findNode(this.root, value);
  }

  findNode(root, value) {
    if (root === null) return null;
    if (root.data > value) {
      return this.findNode(root.left, value);
    } else if (root.data < value) {
      return this.findNode(root.right, value);
    } else {
      return root;
    }
  }

  levelOrder(root) {
    if (!root) return [];
    const queue = [root];
    return this.levelOrderHelper(queue);
  }

  levelOrderHelper(queue, result = []) {
    if (queue.length === 0) return result;
    const node = queue.shift();
    result.push(node.data);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    return this.levelOrderHelper(queue, result);
  }

  preorder(root, nodesVisited = []) {
    if (!root) return [];
    nodesVisited.push(root.data);
    this.preorder(root.left, nodesVisited);
    this.preorder(root.right, nodesVisited);
    return nodesVisited;
  }

  inorder(root, nodesVisited = []) {
    if (!root) return [];
    this.inorder(root.left, nodesVisited);
    nodesVisited.push(root.data);
    this.inorder(root.right, nodesVisited);
    return nodesVisited;
  }

  postorder(root, nodesVisited = []) {
    if (!root) return [];
    this.postorder(root.left, nodesVisited);
    this.postorder(root.right, nodesVisited);
    nodesVisited.push(root.data);
    return nodesVisited;
  }

  depth(root, node, counter = 1) {
    if (!root) return null;
    if (node > root.data) {
      counter++;
      return this.depth(root.right, node, counter);
    }
    if (node < root.data) {
      counter++;
      return this.depth(root.left, node, counter);
    }
    return counter;
  }

  height(node) {
    if (!node) return null;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const heightLeft = this.height(node.left);
    const heightRight = this.height(node.right);
    if (Math.abs(heightLeft - heightRight) > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  reBalanced(root) {
    if (isBalanced(root)) return;
    const heightLeft = this.height(node.left);
    const heightRight = this.height(node.right);
    const unbalancedNode = leftHeight > rightHeight ? root.left : root.right;
    const newRoot = this.rebalanceNode(unbalancedNode);
    if (root === this.root) {
      this.root = newRoot;
    } else if (root.left === unbalancedNode) {
      root.left = newRoot;
    } else {
      root.right = newRoot;
    }
  }

  rebalanceNode(node) {
    const arr = this.inorder(node);
    return this.constructTree(arr);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) return null;
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const myTree = new Tree([5, 3, 7, 2, 4, 6, 8, 1]);
myTree.prettyPrint(myTree.root);
//myTree.deletee(3);
//console.log(myTree.levelOrder(myTree.root));
//console.log(myTree.heigth(3));
console.log(myTree.isBalanced());

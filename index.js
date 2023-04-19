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
    if (!arrayTree.length) {
      return null;
    }
    const duplicatesRemovedArray = arrayTree.filter((elem, index) => {
      return arrayTree.indexOf(elem) === index;
    });

    let sortedArray = this.mergeSort(duplicatesRemovedArray);
    return this.constructTree(sortedArray);
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
  
  deletee(data){
      this.root = this.deleteNode(this.root, data);
      return this.root;
  }

  deleteNode(data) {
     if (root == null) {
      root = new Node(data);
      return root;
    }
    
    if (root.data > data) {
      root.left = this.insertNode(root.left, data);
    } else if (root.data < data) {
      root.right = this.insertNode(root.right, data);
    }else{
        if(root.left === null && root.right === null){
            root.pop();
        }
    }
    return root;
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
    if (arrayTree.length <= 1) {
      return arrayTree;
    }
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

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}
  
  const myTree = new Tree([2, 3, 1, 5, 10, 7, 1]); // 1 2 3 5 7 10
  myTree.insert(6);
  myTree.deletee(3);
  myTree.prettyPrint(myTree.root);
  
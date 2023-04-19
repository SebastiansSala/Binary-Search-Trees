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
      
      let sortedArray = mergeSort(duplicatesRemovedArray);
      let constructedTree = constructTree(sortedArray);
      return constructedTree;
    }
  }
  
  
  function constructTree(arrayTree){
      if(!arrayTree.length){
          return null;
      }
      let mid = Math.floor(arrayTree.length/2);
      let left = arrayTree.slice(0, mid);
      let right = arrayTree.slice(mid + 1);
      let node = new Node(arrayTree[mid]);
      node.left = constructTree(left);
      node.right = constructTree(right);
      return node;
  }
  
  function mergeSort(arrayTree) {
    if (arrayTree.length <= 1) {
      return arrayTree;
    }
    let mid = Math.floor(arrayTree.length / 2);
    let left = arrayTree.slice(0, mid);
    let right = arrayTree.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left, right) {
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
  
  function prettyPrint(node, prefix = '', isLeft = true){
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
  
  const myTree = new Tree([2, 3, 1, 5, 10, 7, 1]); // 1 2 3 5 7 10
  prettyPrint(myTree.root);
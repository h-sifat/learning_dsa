import { printNodeAsTree } from "../util/print-tree";
import { BST } from "./bst";

const treeA = new BST<number>();
treeA.insertMany([7, 4, 9, 1, 6, 8, 10]);
/*
 *                _7_
 *               /   \
 *              4     9
 *             / \   / \
 *            1   6 8  10
 * */

// treeA.visitNodesAtDepth({ depth: 2, visit: console.log });
// treeA.traverseLevelOrder();
printNodeAsTree(treeA.root);

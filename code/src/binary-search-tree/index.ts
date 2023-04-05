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

treeA.visitNodesAtDepth({ depth: 0, visit: console.log });

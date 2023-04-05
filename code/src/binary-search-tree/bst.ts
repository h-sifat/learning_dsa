class Node<T> {
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(public value: T) {}
}

type TraverseOrder = readonly ("left" | "root" | "right")[];

export type VisitCallback<T> = (value: T) => void;

export class BST<T extends number> {
  #root: Node<T> | null = null;

  insert(value: T) {
    if (!this.#root) {
      this.#root = new Node(value);
      return;
    }

    this.#insertRecursive({ value, currentNode: this.#root });
  }

  insertMany(values: T[]) {
    for (const value of values) this.insert(value);
  }

  #insertRecursive(arg: { value: T; currentNode: Node<T> }) {
    const { value, currentNode } = arg;

    if (value === currentNode.value) return;

    const nextNodeDirection = value < currentNode.value ? "left" : "right";

    if (currentNode[nextNodeDirection])
      this.#insertRecursive({
        value,
        currentNode: currentNode[nextNodeDirection]!,
      });
    else currentNode[nextNodeDirection] = new Node(value);
  }

  find(value: T) {
    if (!this.#root) return false;

    let currentNode: Node<T> | null = this.#root;
    while (currentNode) {
      if (currentNode.value === value) return true;

      currentNode =
        currentNode.value < value ? currentNode.left : currentNode.right;
    }

    return false;
  }

  traversePreOrder(visit: VisitCallback<T>) {
    this.#traversePreOrder({
      visit,
      node: this.#root,
      order: ["root", "left", "right"],
    });
  }

  traverseInOrder(visit: VisitCallback<T>) {
    this.#traversePreOrder({
      visit,
      node: this.#root,
      order: ["left", "root", "right"],
    });
  }

  traversePostOrder(visit: VisitCallback<T>) {
    this.#traversePreOrder({
      visit,
      node: this.#root,
      order: ["left", "right", "root"],
    });
  }

  #traversePreOrder(arg: {
    node: Node<T> | null;
    visit: VisitCallback<T>;
    order: TraverseOrder;
  }) {
    const { node, visit } = arg;

    if (!node) return;

    for (const nodeName of arg.order)
      if (nodeName === "root") visit(node.value);
      else
        this.#traversePreOrder({
          visit,
          order: arg.order,
          node: node[nodeName],
        });
  }

  height() {
    return this.#height(this.#root);
  }

  #height(node: Node<T> | null): number {
    if (!node) return -1;
    // leaf node
    if (this.#isLeafNode(node)) return 0;

    return 1 + Math.max(this.#height(node.left), this.#height(node.right));
  }

  #isLeafNode(node: Node<T>) {
    return !node.left && !node.right;
  }

  /*
   * Note: Imagine that this tree is not a BST but it's just a BT and implement
   * the minValue() method. Because in BST it's very easy. Go to the left most
   * leaf node to get the minValue and right most leaf node for maxValue.
   * */
  #minimumValue(node: Node<T> | null): number {
    // we're returning Infinity so that this value gets excluded from the
    // Math.min() function call below.
    if (!node) return Infinity;
    if (this.#isLeafNode(node)) return node.value;

    return Math.min(
      node.value,
      this.#minimumValue(node.left),
      this.#minimumValue(node.right)
    );
  }

  isBST() {
    return this.#isBST({ node: this.#root, min: -Infinity, max: Infinity });
  }

  #isBST(arg: { node: Node<T> | null; min: number; max: number }): boolean {
    const { node, min, max } = arg;

    if (!node) return true;

    return (
      min < node.value &&
      node.value < max &&
      this.#isBST({ node: node.left, min, max: node.value }) &&
      this.#isBST({ node: node.right, min: node.value, max })
    );
  }

  visitNodesAtDepth(arg: { depth: number; visit: VisitCallback<T> }) {
    this.#visitNodesAtDepth({
      node: this.#root,
      visit: arg.visit,
      distance: arg.depth,
    });
  }

  #visitNodesAtDepth(arg: {
    distance: number;
    node: Node<T> | null;
    visit: VisitCallback<T>;
  }) {
    const { node, distance, visit } = arg;

    if (!node) return;
    if (!distance) visit(node.value);

    this.#visitNodesAtDepth({ node: node.left, distance: distance - 1, visit });

    this.#visitNodesAtDepth({
      visit,
      node: node.right,
      distance: distance - 1,
    });
  }

  isEmpty() {
    return Boolean(this.#root);
  }

  isEqual(tree: BST<T>) {
    return this.#isEqual(this.#root, tree.root);
  }

  #isEqual(nodeA: Node<T> | null, nodeB: Node<T> | null): boolean {
    if (!nodeA && !nodeB) return true;

    if (nodeA && nodeB)
      return (
        nodeA.value === nodeB.value &&
        this.#isEqual(nodeA.left, nodeB.left) &&
        this.#isEqual(nodeA.right, nodeB.right)
      );

    return false;
  }

  // @TODO remove it later
  get root() {
    return this.#root;
  }
}

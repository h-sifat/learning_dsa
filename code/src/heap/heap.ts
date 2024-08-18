import { printTree } from "flexible-tree-printer";
import { printNode } from "../util/print-tree";
import { GetSubNodes } from "flexible-tree-printer/dist/interface";

const getParentIdx = (index: number) => Math.floor((index - 1) / 2);
const getLeftIdx = (parent: number) => parent * 2 + 1;
const getRightIdx = (parent: number) => parent * 2 + 2;

export class Heap<T extends string | number> {
  #items: T[] = [];
  #size = 0;

  insert(value: T) {
    let index = this.#size++;
    this.#items[index] = value;

    this.#bubbleUp(index);
  }

  isEmpty() {
    return !this.#size;
  }

  // TODO: fix the remove method
  remove() {
    if (this.isEmpty()) return;

    this.#items[0] = this.#items[--this.#size];

    let index = 0;

    while (index <= this.#size && !this.#isParentValid(index)) {
      const childIdx = this.#largerChildIdx(index);
      this.#swap(index, childIdx);
      index = childIdx;
    }
  }

  #largerChildIdx(index: number) {
    if (!this.#hasLeftChild(index)) return index;
    if (!this.#hasRightChild(index)) return getLeftIdx(index);

    const left = this.#leftChild(index);
    const right = this.#rightChild(index);

    return left > right ? getLeftIdx(index) : getRightIdx(index);
  }

  #isParentValid(index: number) {
    if (!this.#hasLeftChild(index)) return true;

    const parent = this.#items[index];
    let isValid = parent >= this.#leftChild(index);

    if (this.#hasRightChild(index))
      isValid &&= parent <= this.#rightChild(index);

    return isValid;
  }

  #hasLeftChild(index: number) {
    return getLeftIdx(index) <= this.#size;
  }

  #hasRightChild(index: number) {
    return getRightIdx(index) <= this.#size;
  }

  #leftChild(parentIdx: number) {
    return this.#items[getLeftIdx(parentIdx)];
  }

  #rightChild(parentIdx: number) {
    return this.#items[getRightIdx(parentIdx)];
  }

  #bubbleUp(index: number) {
    let parentIdx = getParentIdx(index);

    while (index > 0 && this.#items[index] > this.#items[parentIdx]) {
      this.#swap(index, parentIdx);
      index = parentIdx;
      parentIdx = getParentIdx(index);
    }
  }

  insertMany(values: T[]) {
    for (const value of values) this.insert(value);
  }

  #swap(first: number, second: number) {
    const tempFirst = this.#items[first];

    this.#items[first] = this.#items[second];
    this.#items[second] = tempFirst;
  }

  print() {
    console.log("root:", this.#items);

    if (!this.#items.length) return console.log("<empty>");
    const items = this.#items.slice(0, this.#size);

    type NodeType<T> = { value: T; index: number; type?: "left" | "right" };

    printTree({
      printNode: <any>printNode,
      printRootNode: () => console.log(String(items[0])),
      parentNode: { value: items[0], index: 0 } as NodeType<T>,
      getSubNodes({ parentNode }) {
        const { index } = parentNode!;
        const subNodes: ReturnType<GetSubNodes<NodeType<T>>> = [];

        (
          [
            { type: "left", index: getLeftIdx(index) },
            { type: "right", index: getRightIdx(index) },
          ] as const
        ).map(({ type, index }) => {
          const value = items[index];
          if (typeof value !== "number") return;

          subNodes.push({
            name: String(value),
            value: { index, value, type },
          });
        });

        return subNodes;
      },
    });
  }
}

const heap = new Heap<number>();
heap.insertMany([1, 2, 3, 4, 6, 7, 8]);
heap.print();

console.log("--remove--");
heap.remove();

heap.print();

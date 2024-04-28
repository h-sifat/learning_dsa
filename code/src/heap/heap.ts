import { printTree } from "flexible-tree-printer";
import { printNode } from "../util/print-tree";
import { GetSubNodes } from "flexible-tree-printer/dist/interface";

const getParentIdx = (index: number) => Math.floor((index - 1) / 2);
const getLeftIdx = (parent: number) => parent * 2 + 1;
const getRightIdx = (parent: number) => parent * 2 + 2;

export class Heap<T extends string | number> {
  // @ts-ignore
  #items: T[] = [];
  #size = 0;

  insert(value: T) {
    let index = this.#size++;
    this.#items[index] = value;

    this.#bubbleUp(index);
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
    if (!this.#items.length) return console.log("<empty>");
    const items = this.#items;

    type NodeType<T> = { value: T; index: number; type?: "left" | "right" };

    printTree({
      printNode: <any>printNode,
      printRootNode: () => console.log(String(items[0])),
      parentNode: { value: items[0], index: 0 } as NodeType<T>,
      getSubNodes({ parentNode }) {
        const { index } = parentNode!;
        const subNodes: ReturnType<GetSubNodes<NodeType<T>>> = [];

        const leftIdx = getLeftIdx(index);
        const rightIdx = getRightIdx(index);

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

import { LinkedList } from "../linkedlist/linked-list";

export default class Stack<T> {
  readonly #list = new LinkedList<T>();

  push(item: T) {
    this.#list.addLast(item);
    return this;
  }

  pop(): T | null {
    return this.#list.deleteLast();
  }

  peek(): T | null {
    return this.#list.peekLast();
  }

  isEmpty() {
    return !this.#list.size;
  }

  toArray(): T[] {
    return this.#list.toArray();
  }

  get size(): number {
    return this.#list.size;
  }
}

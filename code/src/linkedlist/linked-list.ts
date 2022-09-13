export interface SinglyLinkedList<Type> {
  get size(): number;
  peekLast(): Type | null;
  peekFirst(): Type | null;
  addLast(value: Type): void;
  addFirst(value: Type): void;
  indexOf(value: Type): number;
  at(index: number): Type | null;
  contains(value: Type): boolean;
  deleteLast(value: Type): Type | null;
  deleteFirst(value: Type): Type | null;
}

class Node<Type> {
  public next: Node<Type> | null = null;
  constructor(public value: Type, next: Node<Type> | null = null) {
    if (next) this.next = next;
  }
}

export class LinkedList<Type> implements SinglyLinkedList<Type> {
  #forEachBreakSignal = Symbol();
  #size = 0;
  #first: Node<Type> | null = null;
  #last: Node<Type> | null = null;

  constructor(items?: Type[]) {
    if (items) for (const item of items) this.addLast(item);
  }

  #addTheFirstItem(node: Node<Type>) {
    this.#first = node;
    this.#last = this.#first;
    this.#size = 1;
  }

  peekFirst() {
    return this.#first ? this.#first.value : null;
  }

  peekLast() {
    return this.#last ? this.#last.value : null;
  }

  addFirst(value: Type) {
    const node = new Node<Type>(value);

    if (!this.#first) {
      this.#addTheFirstItem(node);
      return this;
    }

    node.next = this.#first;
    this.#first = node;
    this.#size++;

    return this;
  }

  addLast(value: Type) {
    const node = new Node<Type>(value);

    if (!this.#first) {
      this.#addTheFirstItem(node);
      return this;
    }

    this.#last!.next = node;
    this.#last = node;

    this.#size++;

    return this;
  }

  deleteFirst(): Type | null {
    if (!this.#first) return null;
    if (this.#size === 1) return this.#deleteTheOnlyItemInList();

    const value = this.#first.value;

    const newFirstNode = this.#first.next;
    this.#first.next = null;
    this.#first = newFirstNode;

    this.#size--;

    return value;
  }

  #deleteTheOnlyItemInList() {
    const value = this.#first!.value;

    this.#first = null;
    this.#last = null;
    this.#size--;

    return value;
  }

  reverse(): LinkedList<Type> {
    if (this.#size < 2) return this;

    this.#last = this.#first;

    let previousNode = this.#first;
    let currentNode = this.#first!.next;

    while (currentNode) {
      const nextNode = currentNode.next;

      currentNode.next = previousNode;

      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.#first = previousNode;
    this.#last!.next = null;

    return this;
  }

  deleteLast(): Type | null {
    if (!this.#first) return null;
    if (this.#size === 1) return this.#deleteTheOnlyItemInList();

    const prevNodeOfTheLastNode = (() => {
      let current = this.#first;
      while (current.next?.next) {
        current = current.next;
      }
      return current;
    })();

    const value = prevNodeOfTheLastNode.next!.value;

    prevNodeOfTheLastNode.next = null;
    this.#last = prevNodeOfTheLastNode;

    this.#size--;

    return value;
  }

  indexOf(value: Type) {
    let index = -1;

    this.#forEach((item, _index) => {
      if (item !== value) return;

      index = _index;
      // break the forEach loop because we've found the searchItem
      return this.#forEachBreakSignal;
    });

    return index;
  }

  contains(value: Type) {
    return this.indexOf(value) !== -1;
  }

  toArray() {
    if (!this.#first) return [];

    const array = new Array(this.#size);

    this.#forEach((item, index) => {
      array[index] = item;
    });

    return array;
  }

  #forEach(callback: (item: Type, index: number) => void | Symbol) {
    if (!this.#first) return;

    let index = 0;
    let current: Node<Type> | null = this.#first;
    while (current) {
      const res = callback(current.value, index++);

      // break the loop if callback returns the break signal symbol
      if (res == this.#forEachBreakSignal) return;
      current = current.next;
    }
  }

  at(index: number) {
    let value: Type | null = null;

    this.#forEach((currentValue, currentIndex) => {
      if (currentIndex !== index) return;

      value = currentValue;
      return this.#forEachBreakSignal;
    });

    return value;
  }

  get size() {
    return this.#size;
  }
}

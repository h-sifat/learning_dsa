import { inspect } from "util";

interface FixedArray_I<T> {
  length: number;
  indexOf(element: T): number;
  lastIndexOf(element: T): number;
  at(index: number): T | undefined;
  find(f: (e: T) => boolean): T | undefined;
  insertAt(index: number, element: T): FixedArray_I<T>;
}

export default class FixedArray<T> implements FixedArray_I<T> {
  #array: T[];

  constructor(length: number) {
    this.#array = new Array(length);
  }

  insertAt(index: number, element: T): FixedArray<T> {
    this.#assertValidIndex(index);
    this.#array[index] = element;

    return this;
  }

  at(index: number): T | undefined {
    this.#assertValidIndex(index);
    return this.#array[index];
  }

  #assertValidIndex(index: number) {
    if (!Number.isInteger(index))
      throw new Error(`Index must be of type integer.`);

    if (index < 0) throw new Error(`Invalid index: ${index}`);

    if (
      !this.#array.length
        ? index > this.#array.length
        : index >= this.#array.length
    )
      throw new Error(`Array index (${index}) out of bound.`);
  }

  indexOf(searchElement: T): number {
    for (let index = 0; index < this.#array.length; index++)
      if (searchElement === this.#array[index]) return index;

    return -1;
  }

  lastIndexOf(searchElement: T): number {
    for (let index = this.#array.length - 1; index > -1; index--)
      if (searchElement === this.#array[index]) return index;

    return -1;
  }

  find(f: (e: T) => boolean): T | undefined {
    for (let index = 0; index < this.#array.length; index++) {
      const element = this.#array[index];
      if (f(element)) return element;
    }

    return undefined;
  }

  get length() {
    return this.#array.length;
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return inspect(this.#array);
  }

  toString() {
    return inspect(this.#array);
  }
}

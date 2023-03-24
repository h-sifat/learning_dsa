# Stack

## Chapter 2 - What are stacks

Usages examples:

1. Implement the undo feature
1. Build compilers (eg syntax checking)
1. Evaluate expressions (eg `1 + 2 * 3`)
1. Build navigation (eg forward/backward)

**LIFO:** Last In First Out

### Operations

| operation  | description                                                    | time complexity |
| ---------- | -------------------------------------------------------------- | --------------- |
| push(item) | adds an item                                                   | O(1)            |
| pop()      | removes the item on the top                                    | O(1)            |
| peek()     | returns the item on the top without removing it from the stack | O(1)            |
| isEmpty()  | self describing                                                | O(1)            |

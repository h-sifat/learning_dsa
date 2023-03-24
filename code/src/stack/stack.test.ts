import Stack from "./stack";

it(`works as expected`, () => {
  const stack = new Stack<number>();

  expect(stack.size).toBe(0);
  expect(stack.isEmpty()).toBeTruthy();

  stack.push(1);

  expect(stack.peek()).toBe(1);
  expect(stack.size).toBe(1);
  expect(stack.isEmpty()).toBeFalsy();

  stack.push(2);

  expect(stack.peek()).toBe(2);
  expect(stack.size).toBe(2);
  expect(stack.peek()).toBe(2);

  expect(stack.toArray()).toEqual([1, 2]);

  expect(stack.pop()).toBe(2);
  expect(stack.peek()).toBe(1);
  expect(stack.size).toBe(1);
  expect(stack.isEmpty()).toBeFalsy();

  expect(stack.pop()).toBe(1);
  expect(stack.peek()).toBe(null);
  expect(stack.size).toBe(0);
  expect(stack.isEmpty()).toBeTruthy();

  expect(stack.pop()).toBe(null);
});

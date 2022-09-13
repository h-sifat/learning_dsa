import { LinkedList } from "./linked-list";

let list: LinkedList<number>;

beforeEach(() => {
  list = new LinkedList<number>();
});

describe("Constructor", () => {
  it(`inerts all the items of the array provided to the constructor`, () => {
    const array = [1, 2, 3];
    const myList = new LinkedList<number>(array);
    expect(myList.toArray()).toEqual(array);
  });
});

describe("addFirst", () => {
  it("add the first item in the list", () => {
    expect(list.size).toBe(0);

    list.addFirst(1);
    expect(list.size).toBe(1);

    expect(list.toArray()).toEqual([1]);
  });

  it("adds the item at the first if link is not empty", () => {
    list.addFirst(1);
    list.addFirst(2);

    expect(list.size).toBe(2);
    expect(list.toArray()).toEqual([2, 1]);
  });
});

describe("addLast", () => {
  it(`adds the first item in the list if it empty`, () => {
    expect(list.size).toBe(0);

    list.addLast(1);
    expect(list.size).toBe(1);

    expect(list.toArray()).toEqual([1]);
  });

  it(`adds items at the last if list is non_empty`, () => {
    list.addLast(1);
    list.addLast(2);

    expect(list.size).toBe(2);
    expect(list.toArray()).toEqual([1, 2]);
  });
});

describe("toArray", () => {
  it.each([{ array: [1, 2, 3] }, { array: [1] }, { array: [] }])(
    "converts the non_empty list $array into an array",
    ({ array }) => {
      array.forEach((item) => list.addLast(item));

      const listArray = list.toArray();
      expect(listArray).toHaveLength(array.length);
      expect(listArray).toEqual(array);
    }
  );
});

describe("indexOf", () => {
  it.each([
    {
      items: [],
      searchItem: 1,
      result: -1,
    },
    {
      items: [1],
      searchItem: 1,
      result: 0,
    },
    {
      items: [1, 2, 3],
      searchItem: 3,
      result: 2,
    },
    {
      items: [1, 2, 3],
      searchItem: 2,
      result: 1,
    },
  ])(
    `($items).indexOf($searchItem) = $result`,
    ({ items, searchItem, result }) => {
      items.forEach((item) => list.addLast(item));

      expect(list.indexOf(searchItem)).toBe(result);
    }
  );
});

describe("contains", () => {
  it.each([
    {
      items: [],
      searchItem: 1,
      result: false,
    },
    {
      items: [1],
      searchItem: 1,
      result: true,
    },
    {
      items: [1, 2, 3],
      searchItem: 3,
      result: true,
    },
    {
      items: [1, 2, 3],
      searchItem: 2,
      result: true,
    },
  ])(
    `($items).contains($searchItem) = $result`,
    ({ items, searchItem, result }) => {
      items.forEach((item) => list.addLast(item));
      expect(list.contains(searchItem)).toBe(result);
    }
  );
});

describe("deleteFirst", () => {
  it(`returns null if the list is empty`, () => {
    expect(list.deleteFirst()).toBeNull();
  });

  it(`deletes and returns the first item`, () => {
    const array = [1, 2, 3];
    array.forEach((n) => list.addLast(n));

    expect(list.size).toBe(array.length);

    const firstItem = list.deleteFirst();

    expect(list.size).toBe(array.length - 1);
    expect(firstItem).toBe(array[0]);

    expect(list.toArray()).toEqual(array.slice(1));
  });

  it(`deletes the first item if the list has only one item`, () => {
    const insertedItem = 2;
    list.addLast(insertedItem);

    const deletedItem = list.deleteFirst();

    expect(deletedItem).toBe(insertedItem);
    expect(list.size).toBe(0);
  });
});

describe("deleteLast", () => {
  it(`returns null if the list is empty`, () => {
    expect(list.deleteLast()).toBeNull();
  });

  it(`deletes the first item if the list has only one item`, () => {
    const insertedItem = 2;
    list.addLast(insertedItem);

    const deletedItem = list.deleteLast();

    expect(deletedItem).toBe(insertedItem);
    expect(list.size).toBe(0);
  });

  it(`deletes and returns the last item`, () => {
    const array = [1, 2, 3];
    array.forEach((n) => list.addLast(n));

    expect(list.size).toBe(array.length);

    const lastItem = list.deleteLast();

    expect(list.size).toBe(array.length - 1);
    expect(lastItem).toBe(array[array.length - 1]);

    expect(list.toArray()).toEqual(array.slice(0, -1));

    expect(list.peekLast()).toBe(array[array.length - 2]);
  });
});

describe("peekFirst", () => {
  it(`returns null if the list is empty`, () => {
    expect(list.peekFirst()).toBeNull();
  });

  it(`returns the first item without deleting it`, () => {
    const insertedItem = 1;
    list.addFirst(insertedItem);

    expect(list.peekFirst()).toBe(insertedItem);
    expect(list.size).toBe(1);
  });
});

describe("peekLast", () => {
  it(`returns null if the list is empty`, () => {
    expect(list.peekLast()).toBeNull();
  });

  it(`returns the first item without deleting it`, () => {
    const insertedItem = 1;
    list.addLast(insertedItem);

    expect(list.peekLast()).toBe(insertedItem);
    expect(list.size).toBe(1);
  });
});

describe("at", () => {
  it(`returns null if the list is empty`, () => {
    expect(list.at(1)).toBeNull();
  });

  it(`returns the item if found`, () => {
    const array = [1, 2, 3];
    array.forEach((n) => list.addLast(n));

    array.forEach((item, index) => {
      expect(list.at(index)).toBe(item);
    });
  });
});

describe("reverse", () => {
  it.each([
    { items: [1, 2] },
    { items: [1, 2, 3, 4] },
    { items: [1, 2, 3, 4, 100, 2000, 0] },
  ])(`reverses the list $items`, ({ items }) => {
    const list = new LinkedList<number>(items);
    expect(list.reverse().toArray()).toEqual(items.reverse());
  });
});

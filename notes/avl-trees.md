# AVL trees (Adelson-Velsky and Landis)

## 2 - Balanced and Unbalanced trees

Most of the operations on binary trees run in logarithmic time complexity but
this only happens if the tree is balanced.

**Balanced Tree:** In a balanced tree the difference between the hight of the
left and right subtree of every node should be less than or equal to one.
i.e., the tree should not have a long branch.

```
is_balanced = height(left) - height(right) <= 1
```

## 3 - Rotations

- Left (L)
- Right (R)
- Left-Right (LR)
- Right-Left (RL)

### Left Rotation (L)

```
height    0 [1] 2
^             \
|           0 [2] 1             1 [2] 1
|               \               /     \
|             0 [3] 0      0 [1] 0   0 [3] 0
```

### Right Rotation (R)

```
height        2 [3] 0
^              /
|          1 [2] 0              1 [2] 1
|            /                  /     \
|       0 [1] 0            0 [1] 0   0 [3] 0
```

### Left Right Rotation (LR)

The imbalance is in the left child's right subtree.

```
height        2 [7] 0             2 [7] 0
^              /                   /
|          0 [3] 1   -- L -->  1 [5] 0 -- R -->    1 [5] 1
|              \                /                  /     \
|             0 [5] 0       0 [3] 0           0 [3] 0   0 [7] 0
```

### Right Left Rotation (RL)

The imbalance is in the right child's left subtree.

```
height  0 [3] 2          0 [3] 2
^           \                \
|        1 [7] 0  -- R --> 0 [5] 1  -- L -->    1 [5] 1
|          /                   \                /     \
|      0 [5] 0               0 [7] 0        0 [3] 0 0 [7] 0
```

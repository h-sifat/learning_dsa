import { printTree } from "flexible-tree-printer";
import { Node } from "../binary-search-tree/bst";

export function printNodeAsTree<
  TreeNode extends Node<any> & { type?: "left" | "right" }
>(node: TreeNode | null) {
  if (!node) return;

  printTree<TreeNode>({
    parentNode: node,
    getSubNodes({ parentNode }) {
      return ["left" as const, "right" as const]
        .filter((type) => parentNode?.[type])
        .map((type) => ({ ...parentNode?.[type], type }))
        .map((node) => ({ name: node?.value, value: node as TreeNode }));
    },
    printNode: <any>printNode,
    printRootNode: () => console.log(String(node.value)),
  });
}

export function printNode<T = any>({
  node,
  nodePrefix,
}: {
  nodePrefix: string[];
  node: { value: any; type: "left" | "right" };
}) {
  if (node.value.type) {
    const direction = node.value.type === "left" ? "l" : "r";
    nodePrefix = nodePrefix.slice(0, -2).concat([direction, "─"]);
  }

  console.log(nodePrefix.join(""), node.value.value);
}

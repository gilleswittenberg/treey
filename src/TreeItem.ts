import Item from "./Item"

interface TreeItem extends Item {
  relations: TreeItems
}

type TreeItems = TreeItem[]

export default TreeItem
export {
  TreeItems
}

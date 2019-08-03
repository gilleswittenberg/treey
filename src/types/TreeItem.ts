import { Item } from "./Item"

export default interface TreeItem extends Item {
  isRoot?: boolean,
  relations: TreeItems
}

export type TreeItems = TreeItem[]

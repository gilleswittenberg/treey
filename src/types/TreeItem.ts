import Item from "./Item"
import { FullName } from "./types"

export default interface TreeItem extends Item {
  relations: TreeItems
  name: FullName
  isCyclic: boolean
  isKnown: boolean
  isBurned: boolean
}

export type OptionalTreeItem = TreeItem | undefined
export type TreeItems = TreeItem[]

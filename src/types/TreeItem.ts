import Item from "./Item"

export default interface TreeItem extends Item {
  relations: TreeItems
  name: FullName
  isCyclic: boolean
  isKnown: boolean
  isBurned: boolean
}

export type TreeItems = TreeItem[]

declare type TreeItem = Item & {
  readonly relations: TreeItems
  readonly name: FullName
  readonly isCyclic: boolean
  readonly isKnown: boolean
  readonly isDestroyed: boolean
}
declare type OptionalTreeItem = Optional<TreeItem>
declare type TreeItems = TreeItem[]

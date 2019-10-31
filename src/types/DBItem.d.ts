declare type DBItem = Item & {
  readonly id: FullName
  readonly isRoot?: boolean
}
declare type OptionalDBItem = Optional<DBItem>
declare type DBItems = DBItem[]

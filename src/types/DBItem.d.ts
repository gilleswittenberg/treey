declare type DBItem = Item & {
  readonly id: UUID
  readonly isRoot?: boolean
}
declare type OptionalDBItem = Optional<DBItem>
declare type DBItems = DBItem[]

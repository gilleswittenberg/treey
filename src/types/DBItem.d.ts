declare interface DBItem extends Item {
  readonly isRoot?: boolean
  readonly id: UUID
}
declare type OptionalDBItem = Optional<DBItem>
declare type DBItems = DBItem[]

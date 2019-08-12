import Item from "./Item"

export default interface DBItem extends Item {
  readonly isRoot?: boolean
  readonly id: UUID
}

export type DBItems = DBItem[]

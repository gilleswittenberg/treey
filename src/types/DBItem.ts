import Item from "./Item"

export default interface DBItem extends Item {
  isRoot?: boolean,
  id: UUID
}

export type DBItems = DBItem[]

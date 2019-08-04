import Item from "./Item"
import { UUID } from "./types"

export default interface DBItem extends Item {
  isRoot?: boolean,
  id: UUID
}

export type DBItems = DBItem[]

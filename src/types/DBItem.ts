import Item from "./Item"
import { UUID } from "./types"

export default interface DBItem extends Item {
  id: UUID
}

export type DBItems = DBItem[]

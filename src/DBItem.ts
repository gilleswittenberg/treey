import Item from "./Item"
import { UUID } from "./types"

interface DBItem extends Item {
  id: UUID
}

type DBItems = DBItem[]

export default DBItem
export {
  DBItems
}

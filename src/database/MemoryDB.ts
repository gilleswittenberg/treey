import { UUID } from "../types"
import DBItem, { DBItems } from "../DBItem"
const store: Record<UUID, DBItem> = {}

const create = async (item: DBItem) : Promise<DBItem> => {
  const id = item.id
  store[id] = item
  return item
}

const read = async (id: UUID) : Promise<DBItem> => {
  const item = store[id]
  if (item != null) return item
}

const update = async (item: DBItem) : Promise<DBItem> => {
  const id = item.id
  store[id] = item
  return item
}

const index = async () : Promise<DBItems> =>  {
  return Object.values(store)
}

export default {
  create,
  read,
  update,
  index
}

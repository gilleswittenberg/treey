import DBItem, { DBItems } from "../types/DBItem"

const store: Record<UUID, DBItem> = {}

const create = async (item: DBItem) : Promise<DBItem> => {
  const id = item.id
  store[id] = item
  return item
}

const read = async (id: UUID) : Promise<DBItem | undefined> => {
  const item = store[id]
  return item != null ? item : undefined
}

const update = async (item: DBItem) : Promise<DBItem> => {
  const id = item.id
  store[id] = item
  return item
}

const index = async () : Promise<DBItems> =>  {
  return Object.values(store)
}

const clear = async () : Promise<DBItems> => {
  Object.keys(store).forEach((key: UUID) => delete store[key])
  return await index()
}

export default {
  create,
  read,
  update,
  index,
  clear
}

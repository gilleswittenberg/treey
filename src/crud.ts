import { Id } from "./types"
import { Item, Items, ItemEvents, ItemEventType } from "./Item"
import createEvent from "./createEvent"
import createItem from "./createItem"
import database from "./database/database"
import toArray from "./utils/toArray"

const create = async () : Promise<Item | undefined> => {
  const itemEventCreate = createEvent(ItemEventType.Create)
  const item = createItem([itemEventCreate])
  if (item == null) return
  return await database.create(item)
}

const read = async (id: Id) : Promise<Item | undefined> => {
  return database.read(id)
}

const update = async (id: Id, events: ItemEvents) : Promise<Item | undefined> => {
  return database.update(id, events)
}

const del = async (id: Id) : Promise<Item | undefined> => {
  return await database.del(id)
}

const index = async () : Promise<Items> => {
  return toArray(await database.index())
}

export default {
  create,
  read,
  update,
  del,
  index
}

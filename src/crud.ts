import { Id } from "./types/types"
import { Item, Items, ItemEvent, ItemEvents, ItemEventType } from "./types/Item"
import createEvent from "./createEvent"
import createItem from "./createItem"
import database from "./database/database"
import toArray from "./utils/toArray"

const create = async (isRoot = false) : Promise<Item | undefined> => {
  const itemEventCreate = createEvent(ItemEventType.Create)
  const item = createItem([itemEventCreate])
  return await database.create(item, isRoot)
}

const read = async (id: Id) : Promise<Item | undefined> => {
  return database.read(id)
}

const update = async (id: Id, events: ItemEvent | ItemEvents) : Promise<Item | undefined> => {
  return database.update(id, toArray(events))
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
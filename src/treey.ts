import { Id, Data, Index } from "./types"
import Item, { Items, ItemEvents, ItemEventType, ItemEventPayload } from "./Item"
import createUUID from "./createUUID"
import createEvent from "./createEvent"
import createItem from "./createItem"
import database from "./database/database"

const create = async () : Promise<Item> => {
  const itemEventCreate = createEvent(ItemEventType.Create)
  const item = createItem([itemEventCreate])
  return await database.create(item)
}

const read = async (id: Id) : Promise<Item> => {
  return database.read(id)
}

const update = async (id: Id, events: ItemEvents) : Promise<Item> => {
  return database.update(id, events)
}

const del = async (id: Id) : Promise<Item> => {
  return await database.del(id)
}

const index = async () : Promise<Items> => {
  return await database.index()
}

export default {
  create,
  read,
  update,
  del,
  index
}

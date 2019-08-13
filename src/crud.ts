import createEvent from "./createEvent"
import createItem from "./createItem"
import * as database from "./database/database"
import toArray from "./utils/toArray"

export const create = async (isRoot = false) : Promise<Item> => {
  const itemEventCreate = createEvent("Create")
  const item = createItem(itemEventCreate)
  return await database.create(item, isRoot)
}

export const read = async (id: Id) : Promise<OptionalItem> => {
  return await database.read(id)
}

export const update = async (id: Id, events: ItemEvent | ItemEvents) : Promise<OptionalItem> => {
  return await database.update(id, toArray(events))
}

export const del = async (id: Id) : Promise<OptionalItem> => {
  return await database.del(id)
}

export const index = async () : Promise<Items> => {
  return await database.index()
}

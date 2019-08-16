import createEvent from "./factories/createEvent"
import { createItem } from "./factories/createItem"
import * as database from "./database/database"
import toArray from "./utils/toArray"

export const create = async (isRoot = false) : Promise<Item> => {
  const itemEventCreate = createEvent("Create")
  const item = createItem([itemEventCreate])
  return await database.create(item, isRoot)
}

export const read = async (id: Id) : Promise<OptionalItem> => {
  return await database.read(id)
}

export const update = async (id: Id, events: ItemEvent | NonEmptyArray<ItemEvent>) : Promise<OptionalItem> => {
  return await database.update(id, toArray(events) as NonEmptyArray<ItemEvent>)
}

export const del = async (id: Id) : Promise<OptionalItem> => {
  return await database.del(id)
}

export const index = async () : Promise<Items> => {
  return await database.index()
}

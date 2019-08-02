import isBrowser from "../utils/isBrowser"
import IndexedDB from "./IndexedDB"
import MemoryDB from "./MemoryDB"
import { Id } from "../types"
import createUUID from "../createUUID"
import createEvent from "../createEvent"
import { updateItem } from "../createItem"
import Item, { ItemEventType, ItemEvent, ItemEvents } from "../Item"
import toArray from "../utils/toArray"
import DBItem from "../DBItem"

const create = async (item: Item) => {
  const name = createUUID()
  const id = { protocol: "self", name }
  const itemEventIdentityAdd = createEvent(ItemEventType.IdentityAdd, { id })
  const updatedItem = updateItem(item, [itemEventIdentityAdd])
  const dbItem = { id: name, ...updatedItem }
  return isBrowser ? await IndexedDB.addItem(dbItem) : await MemoryDB.create(dbItem)
}

const read = async (treeyId: Id) => {
  const id = treeyId.name
  return isBrowser ? await IndexedDB.getItem(id) : await MemoryDB.read(id)
}

const update = async (id: Id, events: ItemEvent | ItemEvents) => {
  const item = await read(id)
  const updatedItem = updateItem(item, toArray(events)) as DBItem
  return isBrowser ? await IndexedDB.putItem(updatedItem) : await MemoryDB.update(updatedItem)
}

const del = async (id: Id) => {
  const itemEventBurn = createEvent(ItemEventType.Burn)
  return await update(id, [itemEventBurn])
}

const index = async () => {
  return isBrowser ? await IndexedDB.getItems() : await MemoryDB.index()
}

export default {
  create,
  read,
  update,
  del,
  index
}

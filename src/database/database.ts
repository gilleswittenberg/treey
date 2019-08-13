import isBrowser from "../utils/isBrowser"
import IndexedDB from "./IndexedDB"
import MemoryDB from "./MemoryDB"
import createUUID from "../crypto/createUUID"
import createEvent from "../createEvent"
import { updateItem } from "../createItem"

const create = async (item: Item, isRoot = false) => {
  const name = createUUID()
  const id = { name }
  const itemEventIdentityAdd = createEvent("IdentityAdd", { id })
  const updatedItem = updateItem(item, itemEventIdentityAdd)
  const dbItem = { id: name, isRoot, ...updatedItem }
  return isBrowser ? await IndexedDB.addItem(dbItem) : await MemoryDB.create(dbItem)
}

const read = async (treeyId: Id) => {
  const id = treeyId.name
  if (id == null) return undefined
  return isBrowser ? await IndexedDB.getItem(id) : await MemoryDB.read(id)
}

const update = async (id: Id, events: ItemEvents) => {
  const item = await read(id)
  if (item == null) return undefined
  const updatedItem = updateItem(item, events)
  const dbItem = { id: item.id, isRoot: item.isRoot, ...updatedItem }
  return isBrowser ? await IndexedDB.putItem(dbItem) : await MemoryDB.update(dbItem)
}

const del = async (id: Id) => {
  const itemEventBurn = createEvent("Burn")
  return await update(id, [itemEventBurn])
}

const index = async () => {
  return isBrowser ? await IndexedDB.getItems() : await MemoryDB.index()
}

const clear = async () => {
  isBrowser ? await IndexedDB.clear() : await MemoryDB.clear()
}

export default {
  create,
  read,
  update,
  del,
  index,
  clear
}

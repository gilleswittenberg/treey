import { UUID, Data, Index } from "./types"
import { getItem, getItems, saveItem, updateItem } from "./indexedDB"
import createUUID from "./createUUID"
import { ItemEventType, ItemEventPayload } from "./Item"
import createEvent from "./createEvent"
import createItem from "./createItem"

const protocol = "self"

const create = async (data?: Data) => {
  const name = createUUID()
  const id = { protocol, name }
  const itemEventCreate = createEvent(ItemEventType.Create)
  const itemEventIdentityAdd = createEvent(ItemEventType.IdentityAdd, { id })
  const itemEventDataSet = createEvent(ItemEventType.DataSet, data)
  const events = [itemEventCreate, itemEventDataSet]
  const item = createItem(events)
  await saveItem(item)
}

const read = async (id: UUID) => {
  return await getItem(id)
}

const update = async (id: UUID, data: Data) => {
  const itemEventDataSet = createEvent(ItemEventType.DataSet, data)
  await updateItem(id, itemEventDataSet)
}

const del = async (id: UUID) => {
  const itemEventBurn = createEvent(ItemEventType.Burn)
  await updateItem(id, itemEventBurn)
}

const index = async () => {
  return await getItems()
}

const addRelation = async (name: UUID, index?: Index) => {
  const id = { protocol, name }
  const payload: ItemEventPayload = { id }
  if (index != null) payload.index = index
  const itemEventRelationAdd = createEvent(ItemEventType.RelationAdd, payload)
  await updateItem(name, itemEventRelationAdd)
}

const removeRelation = async (name: UUID, index?: Index) => {
  const id = { protocol, name }
  const payload: ItemEventPayload = { id }
  if (index != null) payload.index = index
  const itemEventRelationRemove = createEvent(ItemEventType.RelationRemove, payload)
  await updateItem(name, itemEventRelationRemove)
}

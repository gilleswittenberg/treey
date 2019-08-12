import crud from "../src/crud"
import DBItem from "../src/types/DBItem"
import { ItemEventType } from "../src/types/Item"
import createEvent from "../src/createEvent"
import database from "../src/database/database"

beforeEach(async () => await database.clear())

test("create", async () => {
  const item = <DBItem>(await crud.create())
  expect(item.id).not.toBeNull()
  expect(item.events.length).toBe(2)
  expect(item.events[0].type).toBe(ItemEventType.Create)
  expect(item.events[1].type).toBe(ItemEventType.IdentityAdd)
  expect(item.state.ids![0].name).toBe(item.id)
  expect(item.state.ids![0].protocol).toBeUndefined()
})

test("read", async () => {
  const newItem = await crud.create() as DBItem
  const id = { name: newItem.id }
  const item = await crud.read(id)
  expect(item).not.toBeUndefined()
})

test("update", async () => {
  const newItem = await crud.create() as DBItem
  const id = { name: newItem.id }
  const event = createEvent(ItemEventType.DataSet, { data: "Lorum Ipsum" })
  const item = await crud.update(id, [event])
  expect(item!.events!.length).toBe(3)
  expect(item!.state!.data).toBe("Lorum Ipsum")
})

test("del", async () => {
  const newItem = await crud.create() as DBItem
  const id = { name: newItem.id }
  const item = await crud.del(id)
  expect(item!.events![2].type).toBe(ItemEventType.Burn)
})

test("index", async () => {
  await crud.create()
  await crud.create()
  const items = await crud.index()
  expect(items.length).toBe(2)
})

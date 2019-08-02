import treey from "../src/treey"
import DBItem from "../src/DBItem"
import { ItemEventType } from "../src/Item"
import createEvent from "../src/createEvent"

test("create", async () => {
  const item = <DBItem>(await treey.create())
  expect(item.id).not.toBeNull()
  expect(item.events.length).toBe(2)
  expect(item.events[0].type).toBe(ItemEventType.Create)
  expect(item.events[1].type).toBe(ItemEventType.IdentityAdd)
  expect(item.state.ids[0].protocol).toBe("self")
  expect(item.state.ids[0].name).toBe(item.id)
})

test("read", async () => {
  const newItem = await treey.create() as DBItem
  const id = { protocol: "self", name: newItem.id }
  const item = await treey.read(id)
  expect(item).not.toBeUndefined()
})

test("update", async () => {
  const newItem = await treey.create() as DBItem
  const id = { protocol: "self", name: newItem.id }
  const event = createEvent(ItemEventType.DataSet, { data: "Lorum Ipsum" })
  const item = await treey.update(id, [event])
  expect(item.events.length).toBe(3)
  expect(item.state.data).toBe("Lorum Ipsum")
})

test("del", async () => {
  const newItem = await treey.create() as DBItem
  const id = { protocol: "self", name: newItem.id }
  const item = await treey.del(id)
  expect(item.events[2].type).toBe(ItemEventType.Burn)
})

test("index", async () => {
  await treey.create()
  await treey.create()
  const items = await treey.index()
  expect(items.length).toBeGreaterThan(1)
})

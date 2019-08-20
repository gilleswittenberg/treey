import { create, read, update, del, index } from "../src/crud"
import createEvent from "../src/factories/createEvent"
import { clear } from "../src/database/database"

beforeEach(async () => await clear())

test("create", async () => {
  const item = await create()
  const dbItem = item as DBItem
  expect(dbItem.id).not.toBeNull()
  expect(item.events.length).toBe(2)
  expect(item.events[0].type).toBe("Create")
  expect(item.events[1].type).toBe("Identify")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(item.state.ids![0].name).toBe(dbItem.id)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(item.state.ids![0].protocol).toBeUndefined()
})

test("read", async () => {
  const newItem = await create() as DBItem
  const id = { name: newItem.id }
  const item = await read(id)
  expect(item).not.toBeUndefined()
})

test("update", async () => {
  const newItem = await create() as DBItem
  const id = { name: newItem.id }
  const event = createEvent("Set", { data: "Lorum Ipsum" })
  const item = await update(id, [event])
  expect(item && item.events && item.events.length).toBe(3)
  expect(item && item.state && item.state.data).toBe("Lorum Ipsum")
})

test("del", async () => {
  const newItem = await create() as DBItem
  const id = { name: newItem.id }
  const item = await del(id)
  expect(item && item.events && item.events[2].type).toBe("Destroy")
})

test("index", async () => {
  await create()
  await create()
  const items = await index()
  expect(items.length).toBe(2)
})

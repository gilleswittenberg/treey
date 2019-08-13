import crud from "../src/crud"
import createEvent from "../src/createEvent"
import database from "../src/database/database"

beforeEach(async () => await database.clear())

test("create", async () => {
  const item = await crud.create()
  const dbItem = item as DBItem
  expect(dbItem.id).not.toBeNull()
  expect(item.events.length).toBe(2)
  expect(item.events[0].type).toBe("Create")
  expect(item.events[1].type).toBe("IdentityAdd")
  expect(item.state.ids![0].name).toBe(dbItem.id)
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
  const event = createEvent("DataSet", { data: "Lorum Ipsum" })
  const item = await crud.update(id, [event])
  expect(item!.events!.length).toBe(3)
  expect(item!.state!.data).toBe("Lorum Ipsum")
})

test("del", async () => {
  const newItem = await crud.create() as DBItem
  const id = { name: newItem.id }
  const item = await crud.del(id)
  expect(item!.events![2].type).toBe("Burn")
})

test("index", async () => {
  await crud.create()
  await crud.create()
  const items = await crud.index()
  expect(items.length).toBe(2)
})

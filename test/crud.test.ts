/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { create, read, update, del, index, readMany } from "../src/crud"
import createEvent from "../src/factories/createEvent"
import { clear } from "../src/database/database"

beforeEach(async () => await clear())

describe("create", () => {

  test("create", async () => {
    const item = await create()
    const dbItem = item as DBItem
    expect(dbItem.id).not.toBeNull()
    expect(item.events.length).toBe(2)
    expect(item.events[0].type).toBe("Create")
    expect(item.events[1].type).toBe("Identify")
    expect(item.state.ids![0].name).toBe(dbItem.id)
    expect(item.state.ids![0].protocol).toBeUndefined()
  })
})

describe("read", () => {

  test("read", async () => {
    const newItem = await create() as DBItem
    const id = { name: newItem.id }
    const item = await read(id)
    expect(item).not.toBeUndefined()
  })
})

describe("update", () => {

  test("update", async () => {
    const newItem = await create() as DBItem
    const id = { name: newItem.id }
    const event = createEvent("Set", { data: "Lorum Ipsum" })
    const item = await update(id, [event])
    expect(item && item.events && item.events.length).toBe(3)
    expect(item && item.state && item.state.data).toBe("Lorum Ipsum")
  })

  test("relate indices", async () => {
    const item1 = await create()
    const item2 = await create()
    const item3 = await create()
    const relateEvent1 = createEvent("Relate", { id: item2.state.ids![0], index: 0 })
    const relateEvent2 = createEvent("Relate", { id: item3.state.ids![0], index: 0 })
    const item = await update(item1.state.ids![0], [relateEvent1, relateEvent2])
    expect(item!.state.relations!.length).toBe(2)
    expect(item!.state.relations![0]).toBe(item3.state.ids![0])
    expect(item!.state.relations![1]).toBe(item2.state.ids![0])
  })
})

describe("del", () => {

  test("del", async () => {
    const newItem = await create() as DBItem
    const id = { name: newItem.id }
    const item = await del(id)
    expect(item && item.events && item.events[2].type).toBe("Destroy")
  })
})

describe("index", () => {

  test("index", async () => {
    await create()
    await create()
    const items = await index()
    expect(items.length).toBe(2)
  })
})

describe("readMany", () => {

  test("readMany", async () => {
    const item = await create() as DBItem
    const item1 = await create() as DBItem
    const items = await readMany([{ name: item.id }, { name: item1.id }])
    expect(items.length).toBe(2)
    expect((items[0] as DBItem).id).toEqual(item.id)
    expect((items[1] as DBItem).id).toEqual(item1.id)
  })

  test("readMany undefined", async () => {
    const item = await create() as DBItem
    const items = await readMany([{ name: "u" }, { name: item.id }])
    expect(items.length).toBe(2)
    expect(items[0]).toBeUndefined()
    expect((items[1] as DBItem).id).toEqual(item.id)
  })
})

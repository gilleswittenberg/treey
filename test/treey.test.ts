/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { init, read, createAndAdd, update, remove, move } from "../src/treey"
import { create } from "../src/crud"
import { clear } from "../src/database/database"

beforeEach(async () => await clear())

describe("init", () => {

  test("init", async () => {
    const treeItem = await init()
    expect(treeItem).not.toBeUndefined()
  })
})

describe("read", () => {

  test("read", async () => {
    const newItem = await create() as DBItem
    const id = { name: newItem.id }
    const item = await read(id)
    expect(item).not.toBeUndefined()
  })

  test("undefined item", async () => {
    const id = { name: "not defined" }
    const item = await read(id)
    expect(item).toBeUndefined()
  })
})

describe("createAndAdd", () => {

  test("createAndAdd", async () => {
    const treeItem = await init()
    const parentId = treeItem!.state.ids![0]
    const item = await createAndAdd({ t: "T" }, parentId)
    expect(item!.relations.length).toBe(1)
    expect(item!.relations[0].state.data).toEqual({ t: "T" })
  })
})

describe("update", () => {

  test("update", async () => {
    const treeItem = await init()
    const id = treeItem!.state.ids![0]
    const item = await update(id, { u: "U" })
    expect(item!.state.data).toEqual({ u: "U" })
  })
})

describe("remove", () => {

  test("remove", async () => {
    const treeItem = await init()
    const treeItem2 = await createAndAdd({ v: "V" }, treeItem!.state.ids![0])
    const treeItem3 = await remove(treeItem2!.relations[0].state.ids![0], treeItem2!.state.ids![0])
    expect(treeItem3!.relations.length).toBe(0)
  })
})

describe("move", () => {

  test("move", async () => {
    const treeItem = await init()
    const treeItem2 = await createAndAdd({ child1: "Child1" }, treeItem!.state.ids![0])
    const treeItem3 = await createAndAdd({ child2: "Child2" }, treeItem2!.state.ids![0])
    const treeItem4 = await move(treeItem3!.relations[1].state.ids![0], treeItem3!.state.ids![0], 1, treeItem3!.relations[0].state.ids![0], 0)
    expect(treeItem4!.relations.length).toBe(1)
    expect(treeItem4!.relations[0].relations.length).toBe(1)
    expect(treeItem4!.relations[0].relations[0].state.ids![0]).toBe(treeItem3!.relations[1].state.ids![0])
  })
})

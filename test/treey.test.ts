import { read } from "../src/treey"
import { create } from "../src/crud"
import { clear } from "../src/database/database"

beforeEach(async () => await clear())

describe("read", () => {

  test("read", async () => {
    const newItem = await create() as DBItem
    const id = { name: newItem.id }
    const item = await read(id)
    expect(item).not.toBeUndefined()
  })

  test("undefined", async () => {
    const id = { name: "undefined" }
    const item = await read(id)
    expect(item).toBeUndefined()
  })
})

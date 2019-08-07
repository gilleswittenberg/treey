import { read } from "../src/treey"
import crud from "../src/crud"
import database from "../src/database/database"
import DBItem from "../src/types/DBItem"

beforeEach(async () => await database.clear())

describe("read", () => {

  test("read", async () => {
    const newItem = await crud.create() as DBItem
    const id = { protocol: "self", name: newItem.id }
    const item = await read(id)
    expect(item).not.toBeUndefined()
  })

  test("undefined", async () => {
    const id = { protocol: "self", name: "undefined" }
    const item = await read(id)
    expect(item).toBeUndefined()
  })
})

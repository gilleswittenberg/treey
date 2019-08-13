import { read } from "../src/treey"
import crud from "../src/crud"
import database from "../src/database/database"

beforeEach(async () => await database.clear())

describe("read", () => {

  test("read", async () => {
    const newItem = await crud.create() as DBItem
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

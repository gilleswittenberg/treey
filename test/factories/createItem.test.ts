import { createItem, updateItem } from "../../src/factories/createItem"
import createEvent from "../../src/factories/createEvent"

test("createItem", () => {
  const event = createEvent("Create")
  const item = createItem([event])
  expect(item).not.toBeUndefined()
})

test("updateItem", () => {
  const itemEventCreate = createEvent("Create")
  const item = createItem([itemEventCreate])
  const itemEventDataSet = createEvent("DataSet", { data: "Text" })
  const updatedItem = updateItem(item, [itemEventDataSet])
  expect(updatedItem.events.length).toBe(2)
})

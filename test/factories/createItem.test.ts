import { createItem, updateItem } from "../../src/factories/createItem"
import createEvent from "../../src/factories/createEvent"

test("createItem", () => {
  const event = createEvent("Create")
  const item = createItem([event])
  expect(item).not.toBeUndefined()
  expect(item.state).toEqual({})
})

test("updateItem data", () => {
  const itemEventCreate = createEvent("Create")
  const item = createItem([itemEventCreate])
  const itemEventDataSet = createEvent("Set", { data: "Text" })
  const updatedItem = updateItem(item, [itemEventDataSet])
  expect(updatedItem.events.length).toBe(2)
  expect(updatedItem.state).toEqual({ data: "Text" })
})

test("updateItem", () => {
  const itemEventCreate = createEvent("Create")
  const item = createItem([itemEventCreate])
  const itemEventDataSet = createEvent("Set", { data: "Text" })
  const updatedItem = updateItem(item, [itemEventDataSet])
  expect(updatedItem.events.length).toBe(2)
  expect(updatedItem.state).toEqual({ data: "Text" })
})

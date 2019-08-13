import createItem, { updateItem } from "../src/createItem"
import createEvent from "../src/createEvent"

test("no events", () => {
  expect(() => createItem([])).toThrow()
})

test("wrong event", () => {
  const event = createEvent("Burn")
  expect(() => createItem([event])).toThrow()
})

test("wrong event", () => {
  const event = createEvent("Create")
  expect(() => createItem([event])).not.toThrow()
})

test("updateItem", () => {
  const itemEventCreate = createEvent("Create")
  const item = createItem(itemEventCreate)
  const itemEventDataSet = createEvent("DataSet", { data: "Text" })
  const updatedItem = updateItem(item, itemEventDataSet)
  expect(updatedItem.events.length).toBe(2)
})

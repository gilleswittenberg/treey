import createItem, { updateItem } from "../src/createItem"
import createEvent from "../src/createEvent"
import { ItemEventType } from "../src/types/Item"

test("no events", () => {
  expect(() => createItem([])).toThrow()
})

test("wrong event", () => {
  const event = createEvent(ItemEventType.Burn)
  expect(() => createItem([event])).toThrow()
})

test("wrong event", () => {
  const event = createEvent(ItemEventType.Create)
  expect(() => createItem([event])).not.toThrow()
})

test("updateItem", () => {
  const itemEventCreate = createEvent(ItemEventType.Create)
  const item = createItem(itemEventCreate)
  const itemEventDataSet = createEvent(ItemEventType.DataSet, { data: "Text" })
  const updatedItem = updateItem(item, itemEventDataSet)
  expect(updatedItem.events.length).toBe(2)
})

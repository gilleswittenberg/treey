import { createItem, updateItem } from "../../src/factories/createItem"
import createEvent from "../../src/factories/createEvent"

test("createItem", () => {
  const event = createEvent("Create")
  const item = createItem([event])
  expect(item).not.toBeUndefined()
  expect(item.state).toEqual({})
})

describe("updateItem", () => {

  test("data", () => {
    const itemEventCreate = createEvent("Create")
    const item = createItem([itemEventCreate])
    const itemEventSet = createEvent("Set", { data: "Text" })
    const updatedItem = updateItem(item, [itemEventSet])
    expect(updatedItem.events.length).toBe(2)
    expect(updatedItem.state).toEqual({ data: "Text" })
  })

  test("Identify, Unidentify", () => {
    const itemEventCreate = createEvent("Create")
    const item = createItem([itemEventCreate])
    const itemEventIdentify = createEvent("Identify", { id: { name: "Joe" } })
    const updatedItem = updateItem(item, [itemEventIdentify])
    expect(updatedItem.events.length).toBe(2)
    expect(updatedItem.state.ids).toEqual([{ name: "Joe" }])
    const itemEventUnidentify = createEvent("Unidentify", { id: { name: "Joe" } })
    const updatedItem2 = updateItem(updatedItem, [itemEventUnidentify])
    expect(updatedItem2.events.length).toBe(3)
    expect(updatedItem2.state.ids).toEqual([])
  })

  test("Set", () => {
    const itemEventCreate = createEvent("Create")
    const item = createItem([itemEventCreate])
    const itemEventSet = createEvent("Set", { data: "Text" })
    const updatedItem = updateItem(item, [itemEventSet])
    expect(updatedItem.events.length).toBe(2)
    expect(updatedItem.state.data).toEqual("Text")
    const itemEventSet2 = createEvent("Set", { data: "Text2" })
    const updatedItem2 = updateItem(updatedItem, [itemEventSet2])
    expect(updatedItem2.events.length).toBe(3)
    expect(updatedItem2.state.data).toEqual("Text2")
  })

  describe("Relate, Unrelate", () => {

    test("Relate, Unrelate", () => {
      const itemEventCreate = createEvent("Create")
      const item = createItem([itemEventCreate])
      const itemEventRelate = createEvent("Relate", { id: { name: "Joe" } })
      const itemEventRelate1 = createEvent("Relate", { id: { name: "Jane" } })
      const itemEventRelate2 = createEvent("Relate", { id: { name: "Bob" } })
      const updatedItem = updateItem(item, [itemEventRelate, itemEventRelate1, itemEventRelate2])
      expect(updatedItem.events.length).toBe(4)
      expect(updatedItem.state.relations).toEqual([{ name: "Joe" }, { name: "Jane" }, { name: "Bob" }])
      const itemEventUnrelate = createEvent("Unrelate", { id: { name: "Joe" } })
      const updatedItem2 = updateItem(updatedItem, [itemEventUnrelate])
      expect(updatedItem2.events.length).toBe(5)
      expect(updatedItem2.state.relations).toEqual([{ name: "Jane" }, { name: "Bob" }])
      const itemEventRelate3 = createEvent("Relate", { id: { name: "Bob" }, index: 0 })
      const updatedItem3 = updateItem(updatedItem2, [itemEventRelate3])
      expect(updatedItem3.state.relations).toEqual([{ name: "Bob" }, { name: "Jane" }, { name: "Bob" }])
      const itemEventUnrelate2 = createEvent("Unrelate", { id: { name: "Bob" }, index: 0 })
      const updatedItem4 = updateItem(updatedItem3, [itemEventUnrelate2])
      expect(updatedItem4.state.relations).toEqual([{ name: "Jane" }, { name: "Bob" }])
    })

    test("Unrelate multiple id's without indices", () => {
      const itemEventCreate = createEvent("Create")
      const item = createItem([itemEventCreate])
      const itemEventRelate = createEvent("Relate", { id: { name: "Joe" } })
      const itemEventRelate1 = createEvent("Relate", { id: { name: "Jane" } })
      const itemEventRelate2 = createEvent("Relate", { id: { name: "Joe" } })
      const updatedItem = updateItem(item, [itemEventRelate, itemEventRelate1, itemEventRelate2])
      expect(updatedItem.events.length).toBe(4)
      expect(updatedItem.state.relations).toEqual([{ name: "Joe" }, { name: "Jane" }, { name: "Joe" }])
      const itemEventUnrelate = createEvent("Unrelate", { id: { name: "Joe" } })
      const updatedItem2 = updateItem(updatedItem, [itemEventUnrelate])
      expect(updatedItem2.events.length).toBe(5)
      expect(updatedItem2.state.relations).toEqual([{ name: "Jane" }])
    })
  })
})

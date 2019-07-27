import createEvent from "../src/createEvent"
import { ItemEventType } from "../src/Item"

test("Event.datetime", () => {
  const date = new Date()
  const event = createEvent(ItemEventType.Create)
  expect(event.datetime.getTime()).toBeGreaterThanOrEqual(date.getTime())
})

test("Event Create", () => {
  const event = createEvent(ItemEventType.Create)
  expect(event).not.toBeNull()
  expect(event.payload).toBeUndefined()
})

test("Event IdentityAdd", () => {
  const id = { protocol: "self", name: "name"}
  const event = createEvent(ItemEventType.IdentityAdd, { id })
  expect(event.payload.id).toEqual(id)
})

test("Event IdentityAdd invalid payload", () => {
  const event = createEvent(ItemEventType.IdentityAdd, { data: "name" })
  expect(event.payload).toBeUndefined()
})

test("Event IdentityRemove invalid payload", () => {
  const event = createEvent(ItemEventType.IdentityRemove, { data: "name" })
  expect(event.payload).toBeUndefined()
})

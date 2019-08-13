import createEvent from "../../src/factories/createEvent"

test("Event.datetime", () => {
  const date = new Date()
  const event = createEvent("Create")
  expect(event.datetime.getTime()).toBeGreaterThanOrEqual(date.getTime())
})

test("Event Create", () => {
  const event = createEvent("Create")
  expect(event).not.toBeNull()
  expect(event.payload).toBeUndefined()
})

test("Event IdentityAdd", () => {
  const id = { name: "name"}
  const event = createEvent("IdentityAdd", { id })
  expect(event.payload!.id).toEqual(id)
})

test("Event IdentityAdd invalid payload", () => {
  const event = createEvent("IdentityAdd", { data: "name" })
  expect(event.payload).toBeUndefined()
})

test("Event IdentityRemove invalid payload", () => {
  const event = createEvent("IdentityRemove", { data: "name" })
  expect(event.payload).toBeUndefined()
})

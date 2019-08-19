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

test("Event Identify", () => {
  const id = { name: "name"}
  const event = createEvent("Identify", { id })
  expect(event.payload!.id).toEqual(id)
})

test("Event Identify invalid payload", () => {
  expect(() => createEvent("Identify", { data: "name" })).toThrow()
})
